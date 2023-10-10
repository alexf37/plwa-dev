<?php

    $host = "db";
    $port = "5432";
    $database = "example";
    $user = "localuser";
    $password = "cs4640LocalUser!"; 

    $dbHandle = pg_connect("host=$host port=$port dbname=$database user=$user password=$password");
    if (!$dbHandle) {
        echo "An error occurred connecting to the database";
        exit();
    }

    $result = pg_query($dbHandle, "CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        text VARCHAR(255) NOT NULL,
        time VARCHAR(255) NOT NULL,
        author VARCHAR(255) NOT NULL
    );");
    
    if (!$result) {
        echo "An error occurred creating the table";
        exit();
    }
?>