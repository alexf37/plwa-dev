<?php
require("../api-handler.php");

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
});
