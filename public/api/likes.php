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
    GET(["post"], function ($post_id) {
        global $dbHandle;
        $result = pg_query_params($dbHandle, "SELECT * FROM likes WHERE post = $1;", [$post_id]);
        $result = pg_fetch_all($result, PGSQL_ASSOC);
        respond_with_success($result);
    });
    POST(["post", "time"], function ($post_id, $time) {

        global $dbHandle;
        session_start();
        $user = $_SESSION["user"];
        if (!$user) {
            $_SESSION = array();
            session_destroy();
        }
        $author = $user["id"];


        $result = pg_query_params($dbHandle, "INSERT INTO likes (time, author, post) VALUES ($1, $2, $3);", array($time, $author, $post_id));
        if (!$result) respond_server_error(500, "An error occurred inserting the post");
        respond_with_success(array("success" => "Like inserted successfully"));
    });
});
