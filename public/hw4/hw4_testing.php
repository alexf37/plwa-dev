<?php
include("homework4.php");
?>
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="author" content="your name">
    <meta name="description" content="include some description about your page">

    <title>Homework 4 Test File</title>
</head>

<body>
    <h1>Homework 4 Test File</h1>

    <h2>Problem 1</h2>
    <?php
    echo "Write tests for Problem 1 here\n";
    $test1 = [["score" => 55, "max_points" => 100], ["score" => 55, "max_points" => 100]];
    echo calculateAverage($test1, false); // should be 55
    //...
    ?>

    <p>...</p>
</body>

</html>