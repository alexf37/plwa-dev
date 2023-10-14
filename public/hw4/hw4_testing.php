<?php
include("homework4.php");
header("Content-Type: application/json");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// problem 1
$test1 = [["score" => 55, "max_points" => 100], ["score" => 55, "max_points" => 100]];

// problem 2
$list1 = [
    "user" => "Fred",
    "list" => ["frozen pizza", "bread", "apples", "oranges"]
];
$list2 = [
    "user" => "Wilma",
    "list" => ["bread", "apples", "coffee"]
];
$list3 = [
    "user" => "Fred",
    "list" => ["bread", "apples", "coffee", "milk"]
];

$output = [
    "problem1" => calculateGrade($test1, false),
    "problem2.0" => gridCorners(0, 0),
    "problem2.1" => gridCorners(1, 1),
    "problem2.2" => gridCorners(1, 10),
    "problem2.3" => gridCorners(5, 1),
    "problem3.1" => combineShoppingLists($list1, $list2),
    "problem3.1.5" => combineShoppingLists($list1, $list2, $list3),
    "problem3.2" => combineShoppingLists(),
    "problem4.1" => validateEmail("orange@blue.com", "/^[a-z\.@]+$/"), // returns true
    "problem4.2" => validateEmail("orangeblue.com", "/^[a-z\.@]+$/"), // returns false (but matches this regex)
    "problem4.3" => validateEmail("orange123@blue.com", "/^[a-z\.@]+$/"), // returns false
    "problem4.4" => validateEmail("mst3k@virginia.edu", "/^[a-z][a-z][a-z]?[0-9][a-z][a-z]?[a-z]?@virginia.edu$/"), // returns true
    "problem4.5" => validateEmail("orange@virginia.edu", "/^[a-z][a-z][a-z]?[0-9][a-z][a-z]?[a-z]?@virginia.edu$/"), // returns false
    "problem4.6" => validateEmail("orange@blue.com", "/^[a-z\.@]+$/"), // returns true
    "problem4.7" => validateEmail("orangeblue.com", "/^[a-z\.@]+$/"), // returns false (but matches this regex)
    "problem4.8" => validateEmail("orange123@blue.com", "/^[a-z\.@]+$/") // returns false


];

echo json_encode($output);
