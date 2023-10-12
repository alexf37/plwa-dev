<?php
    require("../../api-handler.php");
    require("../../postgres.php");

     // init db and tables
     $dbHandle = db_connect();
     if (!$dbHandle) respond_server_error(500, "An error occurred connecting to the database");
     $create_tables_result = db_init_tables($dbHandle);
     if (!$create_tables_result) respond_server_error(500, "An error occurred creating tables");

     //handle requests
    handle_http_methods(function() {
        POST(["username", "password"], function($username, $password) {
            global $dbHandle;
            $result = pg_query_params($dbHandle, "INSERT INTO users (username, password) VALUES ($1, $2);", array($username, $password));
            if (!$result) respond_server_error(500, "An error occurred creating a user.");
            respond_with_success(array("success"=>"User created successfully"));
        });
    });
?>