<?php
    http_response_code(200);
    $url = $_SERVER['REQUEST_URI'];
    $path = substr($url, 8);
    $viteManifestFile = file_get_contents("./manifest.json");
    $viteManifest = json_decode($viteManifestFile, true);
    foreach($viteManifest as $key => $value) {
        if ($key == $path) {
            if(str_ends_with($value['file'], '.css')) {
                header('Content-Type: text/css');
            }
            echo file_get_contents($value['file']);
            return;
        }
    }
    echo file_get_contents("./index.html");
