<?php
    use PgSql\Connection;
    require("./api-handler.php");

    function db_connect() {
        $is_local = $_SERVER["SERVER_NAME"] === "localhost";
        $host = $is_local ? "db" : "localhost";
        $port = "5432";
        $database = $is_local ? "example" : "xrk4np";
        $user = $is_local ? "localuser" : "xrk4np";
        $password = $is_local ? "cs4640LocalUser!" : "zpSFBGMZIzxp"; 
    
        $dbHandle = pg_connect("host=$host port=$port dbname=$database user=$user password=$password");
        return $dbHandle;
    }

    function db_init_tables(Connection $dbHandle) {
        $result = pg_query($dbHandle, "CREATE TABLE IF NOT EXISTS posts (
            id SERIAL PRIMARY KEY,
            text VARCHAR(255) NOT NULL,
            time VARCHAR(255) NOT NULL,
            author VARCHAR(255) NOT NULL
        );");
        return $result;
    }
?>