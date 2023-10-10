<?php
    function respond(int $status_code, array $payload) {
        header("Content-Type: application/json");
        http_response_code($status_code);
        echo json_encode($payload);
        exit();
    }

    function respond_server_error(int $status_code = 500, string $message = "Internal server error.") {
        $payload = array("error"=>$message);
        respond($status_code, $payload);
    }

    function respond_client_error(int $status_code = 400, string $message = "Bad request.") {
        $payload = array("error"=>$message);
        respond($status_code, $payload);
    }

    function respond_with_success(array $payload = array("success"=>"Success.")) {
        respond(200, $payload);
    }

    function execute_with_url_params(string $method, array $method_superglobal, array $url_param_keys, callable $callback) {
        if ($_SERVER['REQUEST_METHOD'] == $method) {
            $args = array();
            foreach($url_param_keys as $key => $value) {
                if (!isset($method_superglobal[$value])) {
                    respond_client_error(400, "Missing required parameter: $key");
                }
                $args[$key] = $method_superglobal[$value];
            }
            $callback(...$args);
        }
    }

    // callback must execute a respond function
    function GET(array $url_param_keys, callable $callback) {
        execute_with_url_params("GET", $_GET, $url_param_keys, $callback);
    }
    // callback must execute a respond function
    function POST(array $url_param_keys, callable $callback) {
        execute_with_url_params("POST", $_GET, $url_param_keys, $callback);
    }

    function handle_http_methods(callable $handler) {
        try {
            $handler();
        } catch (Exception $e) {
            respond_server_error(500, $e->getMessage());
        }
        respond_server_error(501, "Not implemented.");
    }
?>