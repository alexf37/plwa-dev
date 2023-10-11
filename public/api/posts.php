<?php
    require("../api-handler.php");
    require("../postgres.php");

    // init db and tables
    $dbHandle = db_connect();
    if (!$dbHandle) respond_server_error(500, "An error occurred connecting to the database");
    $create_tables_result = db_init_tables($dbHandle);
    if (!$create_tables_result) respond_server_error(500, "An error occurred creating tables");

    // handle requests
    handle_http_methods(function() {
        GET([], function() {
            global $dbHandle;
            $result = pg_query($dbHandle, "SELECT * FROM posts;");
            $result = pg_fetch_all($result, PGSQL_ASSOC);
            respond_with_success($result);
        });
        POST(["text", "time", "author"], function($text, $time, $author) {
            global $dbHandle;
            $result = pg_query_params($dbHandle, "INSERT INTO posts (text, time, author) VALUES ($1, $2, $3);", array($text, $time, $author));
            if (!$result) respond_server_error(500, "An error occurred inserting the post");
            respond_with_success(array("success"=>"Post inserted successfully"));
        });
    });
?>