<?php

// hosted at https://cs4640.cs.virginia.edu/xrk4np/hw5/

error_reporting(E_ALL);
ini_set("display_errors", 1);

require('./CategoryGameController.php');

$game = new CategoryGameController($_GET);

$game->run();
