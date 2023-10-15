<?php
require("../api-handler.php");
require("../postgres.php");

// init db and tables
$dbHandle = db_connect();
if (!$dbHandle) respond_server_error(500, "An error occurred connecting to the database");
$create_tables_result = db_init_tables($dbHandle);
if (!$create_tables_result) respond_server_error(500, "An error occurred creating tables");

// handle requests
handle_http_methods(function () {
    GET(["onlyMine?"], function ($onlyMine) {
        global $dbHandle;
        session_start();
        $user = $_SESSION["user"];
        if (!$user) {
            $_SESSION = array();
            session_destroy();
        }
        if ($onlyMine != 1 && $onlyMine != 0) {
            if ($onlyMine !== null) respond_client_error(400, "Invalid parameter type: onlyMine must be a 1 or 0");
            $onlyMine = false;
        }
        $result = pg_query_params(
            $dbHandle,
            "SELECT 
            posts.id, 
            posts.text, 
            posts.time, 
            posts.lat AS latitude,
            posts.lng AS longitude,
            posts.author AS author_id,
            users.username AS author,
            (SELECT COUNT(*) FROM likes WHERE likes.post = posts.id) AS like_count,
            CASE 
              WHEN EXISTS (SELECT 1 FROM likes WHERE likes.post = posts.id AND likes.author = $1) 
              THEN 1 
              ELSE 0 
            END AS user_liked
            FROM posts JOIN users ON posts.author = users.id
            WHERE posts.author = $1 OR ($2 = 1)
            ORDER BY posts.time DESC;",
            [$user["id"], $onlyMine ? 0 : 1]
        );
        $result = pg_fetch_all($result, PGSQL_ASSOC);
        respond_with_success($result);
    });
    POST(["text", "time", "latitude?", "longitude?"], function ($text, $time, $lat, $lng) {
        global $dbHandle;
        session_start();
        $user = $_SESSION["user"];
        if (!$user) {
            $_SESSION = array();
            session_destroy();
            respond_client_error(401, "Not logged in.");
        }
        if (strlen($text) < 1) respond_client_error(400, "Post must be at least 1 character long.");
        $author = $user["id"];
        $result = pg_query_params($dbHandle, "INSERT INTO posts (text, time, author, lat, lng) VALUES ($1, $2, $3, $4, $5);", array($text, $time, $author, $lat, $lng));
        if (!$result) respond_server_error(500, "An error occurred inserting the post");
        respond_with_success(array("success" => "Post inserted successfully"));
    });
});
