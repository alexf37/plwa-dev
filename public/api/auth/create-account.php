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
    POST(["username", "password"], function ($username, $password) {
        global $dbHandle;

        $result = pg_query_params($dbHandle, "SELECT * FROM users WHERE username=$1;", array($username));
        if (!$result) respond_server_error(500, "An error occurred querying the database.");
        $result = pg_fetch_all($result, PGSQL_ASSOC);
        if (count($result) !== 0) respond_client_error(409, "Username already in use.");

        $result = pg_query_params($dbHandle, "INSERT INTO users (username, password) VALUES ($1, $2);", array($username, $password));
        if (!$result) respond_server_error(500, "An error occurred creating the user.");

        $result = pg_query_params($dbHandle, "SELECT * FROM users WHERE username=$1 AND password=$2;", array($username, $password));
        $result = pg_fetch_all($result, PGSQL_ASSOC);
        if (count($result) === 0) respond_client_error(401, "Failed to login newly created user.");

        session_start();
        $user = $result[0];
        unset($user["password"]);
        $_SESSION["user"] = $user;
        respond_with_success(array("success" => "User created successfully"));
    });
});
