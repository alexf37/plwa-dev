<?php
    require("../api-handler.php");

    handle_http_methods(function() {
        GET([], function() {
            session_start();
            $username = $_SESSION["username"];
            respond_with_success(array("username"=>$username));
        });
    });
?>