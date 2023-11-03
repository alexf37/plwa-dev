<?php
require("../api-handler.php");
require("../postgres.php");

$dbHandle = db_connect();
if (!$dbHandle) respond_server_error(500, "An error occurred connecting to the database");

handle_http_methods(function () {
    GET([], function () {
        session_start();
        $status = isset($_SESSION["user"]);
        if (!$status) {
            $_SESSION = array();
            session_destroy();
            respond_client_error(401, "Not logged in.");
        }
        $user = $_SESSION["user"];
        respond_with_success(array("user" => $user));
    });
    POST(["username"], function ($username) {
        global $dbHandle;
        session_start();
        $status = isset($_SESSION["user"]);
        if (!$status) {
            $_SESSION = array();
            session_destroy();
            respond_client_error(401, "Not logged in.");
        }
        if (strlen($username) < 4) respond_client_error(400, "Username must be at least 4 bytes long.");
        if (strlen($username) > 50) respond_client_error(400, "Username must be less than 50 bytes long.");
        if (!preg_match("/^[a-zA-Z0-9]+$/", $username)) respond_client_error(400, "Username must only contain alphanumeric characters.");
        $user = $_SESSION["user"];
        $result = pg_query_params($dbHandle, "UPDATE users SET username = $1 WHERE id = $2;", array($username, $user["id"]));
        if (!$result) respond_server_error(500, "An error occurred updating the user.");
        $_SESSION["user"]["username"] = $username;
        $user = $_SESSION["user"];
        respond_with_success(array("user" => $user));
    });
});
