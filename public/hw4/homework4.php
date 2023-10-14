<?php

/**
 * Homework 4 - PHP Introduction
 *
 * Computing ID: xrk4np
 * Resources used: none except my IDE's intellisense
 */

// scores is of type [[score => int, max_points => int]]
function calculateGrade(array $scores, bool $drop)
{

    $score_total = 0;
    $max_total = 0;
    $lowest_percentage = PHP_INT_MAX;
    $lowest_max = 1;

    foreach ($scores as $score) {
        $score_total += $score["score"];
        $max_total += $score["max_points"];
        $percentage = $score["score"] / $score["max_points"];
        if ($percentage < $lowest_percentage) {
            $lowest_percentage = $percentage;
            $lowest_max = $score["max_points"];
        }
    }

    if ($drop) {
        $score_total -= $lowest_percentage * $lowest_max;
        $max_total -= $lowest_max;
    }

    if ($max_total == 0) {
        return 0;
    }

    return round(100 * $score_total / $max_total, 3);
}

function gridCorners($width, $height)
{
    $last = $width * $height;
    $left = [1, 2, $height, $height - 1, $height + 1, $height * 2];
    $right = [$last, $last - 1, $last - $height, $last - $height + 1, $last - $height + 2, $last - 2 * $height + 1];
    $edges = [];
    if ($width == 1 || $height == 1) {
        for ($i = 1; $i <= $width * $height; $i++) {
            array_push($edges, $i);
        }
        return join(", ", $edges);
    }
    $all = array_merge($left, $right);
    foreach ($all as $i => $value) {
        if ($value < 1 || $value > $last) {
            unset($all[$i]);
        }
    }
    $all = array_unique($all);
    sort($all);
    // still need to account for m<2 and n<2
    return join(", ", $all);
}

function combineShoppingLists(...$lists)
{
    if (!$lists) return [];
    $merged = [];
    foreach ($lists as $list) {
        if (!isset($list['user']) || !isset($list['list'])) continue;
        $user = $list["user"];
        $list = $list["list"];
        foreach ($list as $item) {
            $item_name = $item;
            if (array_key_exists($item_name, $merged)) {
                if (in_array($user, $merged[$item_name])) continue;
                array_push($merged[$item_name], $user);
            } else {
                $merged[$item_name] = [$user];
            }
        }
    }
    ksort($merged);
    return $merged;
}

function validateEmail(string $email, $regex = null)
{
    $pattern = "/^[a-zA-Z0-9+_\-]+(\.[a-zA-Z0-9+_\-]+)*@[a-zA-Z0-9]+[a-zA-Z0-9\.\-]+[a-zA-Z0-9]+$/";
    $result = !!preg_match($pattern, $email);
    if ($regex !== null) {
        $result &= !!preg_match($regex, $email);
    }
    return !!$result;
}
