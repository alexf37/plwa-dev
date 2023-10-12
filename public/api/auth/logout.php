<?php
require("../../api-handler.php");

handle_http_methods(function () {
    GET([], function () {
        session_start();
        $_SESSION = array();
        session_destroy();
        respond_with_success(array("success" => "success"));
    });
});
