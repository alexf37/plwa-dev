<?php

require "../api-handler.php";

handle_http_methods(function () {
    GET(["rows", "cols"], function ($rows, $cols) {
        $rows = intval($rows);
        $cols = intval($cols);
        $init_positions = [];
        if ($rows * $cols < 7) {
            for ($i = 0; $i < $rows; $i++) {
                for ($j = 0; $j < $cols; $j++) {
                    $init_positions[] = ["row" => $i, "col" => $j];
                }
            }
            respond(200, $init_positions);
        }
        while (count($init_positions) < 7) {
            $row_coord = rand(0, $rows - 1);
            $col_coord = rand(0, $cols - 1);
            if (in_array(["row" => $row_coord, "col" => $col_coord], $init_positions)) {
                continue;
            }
            $init_positions[] = ["row" => $row_coord, "col" => $col_coord];
        }

        respond(200, $init_positions);
    });
});