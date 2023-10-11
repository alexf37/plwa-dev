<?php
    header("Content-Type: application/json");

    require("../postgres.php");
    // init db and tables
    if (!$dbHandle) respond_server_error(500, "An error occurred connecting to the database");
    $result = pg_query($dbHandle, "CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        text VARCHAR(255) NOT NULL,
        time VARCHAR(255) NOT NULL,
        author VARCHAR(255) NOT NULL
    );");
    if (!$result) respond_server_error(500, "An error occurred creating the posts table");

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
        echo json_encode(array("error"=>"Unsupported HTTP method"));
        exit();
    }
?>