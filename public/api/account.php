<?php
require("../api-handler.php");

handle_http_methods(function () {
    GET([], function () {
        session_start();
        $user = $_SESSION["user"];
        respond_with_success(array("user" => $user));
    });
});
