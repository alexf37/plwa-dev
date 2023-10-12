<?php
    require("../../api-handler.php");

    handle_http_methods(function() {
        GET([], function() {
            session_start([
                'cookie_lifetime' => 86400,
            ]);
            $status = $_SESSION["username"] == true;
            respond_with_success(array("status"=>$status));
        });
    });
?>