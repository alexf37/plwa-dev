<?php
    http_response_code(200);
    $url = $_SERVER['REQUEST_URI'];
    $path = substr($url, 8);
    $viteManifestFile = file_get_contents("./manifest.json");
    $viteManifest = json_decode($viteManifestFile, true);
    foreach($viteManifest as $key => $value) {
        if ($key == $path) {
            echo file_get_contents($value['file']);
            return;
        }
    }
    echo file_get_contents("./app/index.html");
?>