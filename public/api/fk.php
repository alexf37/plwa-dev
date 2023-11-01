<?php
require("../api-handler.php");
require("../postgres.php");

// init db and tables
$dbHandle = db_connect();
if (!$dbHandle) respond_server_error(500, "An error occurred connecting to the database");
$create_tables_result = db_init_tables($dbHandle);
if (!$create_tables_result) respond_server_error(500, "An error occurred creating tables");

// handle requests
handle_http_methods(function () {
    GET([], function () {
        global $dbHandle;
        $result = pg_query(
            $dbHandle,
            "ALTER TABLE posts DROP CONSTRAINT posts_author_fkey;
            ALTER TABLE posts
            ADD CONSTRAINT posts_author_fkey
            FOREIGN KEY (author) REFERENCES users(id)
            ON DELETE CASCADE;
    
            ALTER TABLE posts DROP CONSTRAINT posts_post_fkey;
            ALTER TABLE posts
            ADD CONSTRAINT posts_post_fkey
            FOREIGN KEY (post) REFERENCES posts(id)
            ON DELETE CASCADE;
            
            ALTER TABLE likes DROP CONSTRAINT likes_post_fkey;
            ALTER TABLE likes
            ADD CONSTRAINT likes_post_fkey
            FOREIGN KEY (post) REFERENCES posts(id)
            ON DELETE CASCADE;
            "
        );
        if (!$result) respond_server_error(500, "An error occurred altering tables");
        respond_with_success();
    });
});
