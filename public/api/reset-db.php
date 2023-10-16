<?php
require("../api-handler.php");
require("../postgres.php");

// init db and tables
$dbHandle = db_connect();
if (!$dbHandle) respond_server_error(500, "An error occurred connecting to the database");

// handle requests
handle_http_methods(function () {
    GET(["table?"], function ($table) {
        global $dbHandle;
        switch ($table) {
            case (null):
                $result = pg_query(
                    $dbHandle,
                    "DROP TABLE IF EXISTS posts CASCADE;
                    DROP TABLE IF EXISTS users CASCADE;
                    DROP TABLE IF EXISTS likes CASCADE;"
                );
                break;
            case ("posts"):
                $result = pg_query($dbHandle, "DROP TABLE IF EXISTS posts CASCADE;");
                break;
            case ("users"):
                $result = pg_query($dbHandle, "DROP TABLE IF EXISTS users CASCADE;");
                break;
            case ("likes"):
                $result = pg_query($dbHandle, "DROP TABLE IF EXISTS likes CASCADE;");
                break;
            default:
                respond_client_error(400, "Invalid table name");
        }
        if (!$result) respond_server_error(500, "An error occurred resetting the database.");
        respond_with_success(["success" => "Database reset successfully"]);
    });
});
