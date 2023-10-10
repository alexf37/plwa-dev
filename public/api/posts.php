<?php
    header("Content-Type: application/json");

    require("../postgres.php");
    if(!$dbHandle) {
        echo "An error occurred connecting to the database";
        exit();
    }

    $method = $_SERVER['REQUEST_METHOD'];
    if ($method == "POST") {
        $text = $_GET['text'];
        $time = $_GET['time'];
        $author = $_GET['author'];
        $result = pg_query_params($dbHandle, "INSERT INTO posts (text, time, author) VALUES ($1, $2, $3);", array($text, $time, $author));
        if (!$result) {
            echo json_encode(array("error"=>"An error occurred inserting the post"));
            exit();
        }
        echo json_encode(array("success"=>"Post inserted successfully"));
    } elseif ($method == "GET") {
        $result = pg_query($dbHandle, "SELECT * FROM posts;");
        $result = pg_fetch_all($result, PGSQL_ASSOC);
        echo json_encode($result);
    } else {
        echo array("error"=>"Unsupported HTTP method");
        exit();
    }
?>