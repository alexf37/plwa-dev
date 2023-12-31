<?php

use PgSql\Connection;

function db_connect() {
    $server_name = $_SERVER["SERVER_NAME"];
    $is_local = $server_name === "localhost";
    $host = $is_local ? "db" : "localhost";
    $port = "5432";
    $database = $is_local ? "example" : "xrk4np";
    $user = $is_local ? "localuser" : "xrk4np";
    $password = $is_local ? "cs4640LocalUser!" : "zpSFBGMZIzxp";

    $dbHandle = pg_connect("host=$host port=$port dbname=$database user=$user password=$password");
    return $dbHandle;
}

function db_init_tables(Connection $dbHandle) {
    $result = pg_query(
        $dbHandle,
        "CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        image TEXT
    );
    CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        text TEXT NOT NULL,
        time TEXT NOT NULL,
        author INT NOT NULL REFERENCES users (id) ON DELETE CASCADE,
        post INT REFERENCES posts (id) ON DELETE CASCADE,
        lat FLOAT,
        lng FLOAT
    );
    CREATE TABLE IF NOT EXISTS likes (
        id SERIAL PRIMARY KEY,
        author INT NOT NULL REFERENCES users (id) ON DELETE CASCADE,
        time TEXT NOT NULL,
        post INT NOT NULL REFERENCES posts (id) ON DELETE CASCADE,
        UNIQUE(author, post)
    );"
    );
    return $result;
}
