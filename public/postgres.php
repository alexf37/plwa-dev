<?php
    use PgSql\Connection;

    function db_connect() {
        $host = "db";
        $port = "5432";
        $database = "example";
        $user = "localuser";
        $password = "cs4640LocalUser!"; 
    
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