<?php
require("../api-handler.php");
require("../postgres.php");

// init db and tables
$dbHandle = db_connect();
if (!$dbHandle) respond_server_error(500, "An error occurred connecting to the database");

// handle requests
handle_http_methods(function () {
    GET([], function () {
        global $dbHandle;
        $result = pg_query(
            $dbHandle,
            "DROP TABLE IF EXISTS posts;
            DROP TABLE IF EXISTS users;
            DROP TABLE IF EXISTS likes;"
        );
        if (!$result) respond_server_error(500, "An error occurred resetting the database.");
        respond_with_success(["success" => "Database reset successfully"]);
    });
});
