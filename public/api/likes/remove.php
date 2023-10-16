<?php
require("../../api-handler.php");
require("../../postgres.php");

// init db and tables
$dbHandle = db_connect();
if (!$dbHandle) respond_server_error(500, "An error occurred connecting to the database");
$create_tables_result = db_init_tables($dbHandle);
if (!$create_tables_result) respond_server_error(500, "An error occurred creating tables");

//handle requests
handle_http_methods(function () {
    POST(["postId"], function ($postId) {
        global $dbHandle;
        session_start();
        $user = $_SESSION["user"];
        if (!$user) {
            $_SESSION = array();
            session_destroy();
            respond_client_error(401, "Not logged in.");
        }
        $author = $user["id"];

        $result = pg_query_params($dbHandle, "DELETE FROM likes WHERE author = $1 AND post = $2;", array($author, $postId));
        if (!$result) respond_server_error(500, "An error occurred removing the like on this post");

        respond_with_success(array("success" => "Removed like on post"));
    });
});
