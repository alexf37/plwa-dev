<?php
require("../../api-handler.php");

handle_http_methods(function () {
    GET([], function () {
        session_start();
        $status = isset($_SESSION["user"]);
        if (!$status) {
            $_SESSION = array();
            session_destroy();
        }
        respond_with_success(array("status" => $status));
    });
});
