<?php

class CategoryGameController {
    private $req = [];
    private $bank = [];

    public function __construct(array $req) {
        session_start();
        $this->req = $req;
        $this->bank = json_decode(file_get_contents("https://www.cs.virginia.edu/~jh2jf/data/categories.json"), true);
        if (empty($this->bank)) {
            require("./error.php");
            exit();
        }
    }

    public function run() {
        $command = "welcome";
        if (isset($this->req["command"])) {
            $command = $this->req["command"];
        }

        switch ($command) {
            case "login":
                $this->login();
                break;
            case "play":
                $this->play();
                break;
            case "logout":
                $this->logout();
                break;
            case "guess":
                $this->guess();
                break;
            case "over":
                $this->showOver();
                break;
            default:
                $this->showWelcome();
                break;
        }
    }

    private function logout() {
        session_destroy();
        $this->showWelcome();
    }

    private function login() {
        if (isset($_POST["name"]) && !empty($_POST["name"])) {
            $_SESSION["name"] = $_POST["name"];
        }
        if (isset($_POST["email"]) && !empty($_POST["email"])) {
            $_SESSION["email"] = $_POST["email"];
        }

        if (!isset($_SESSION["name"]) || !isset($_SESSION["email"])) {
            $this->showWelcome();
            return;
        }

        /*
            guesses is of type:
                {
                    guessed_words: string[];
                    amount_missing: int;
                }[];
                
        */
        $_SESSION["guesses"] = [];
        $_SESSION["categories"] = [];

        for ($i = 0; $i < 4; $i++) {
            while (!isset($category) || array_key_exists($category["category"], $_SESSION["categories"])) {
                $category = $this->bank[array_rand($this->bank)];
            }
            $_SESSION["categories"][$category["category"]] = $category["words"];
        }

        $words = [];
        foreach ($_SESSION["categories"] as $cat) {
            $words = array_merge($words, $cat);
        }
        shuffle($words);
        ksort($words);
        $_SESSION["words"] = $words;
        $_SESSION["status"] = "playing";

        header("Location: ?command=play");
        exit();
    }

    private function guess() {
        if (!isset($_SESSION["name"]) || !isset($_SESSION["email"])) {
            $this->showWelcome();
            return;
        }
        if ($_SESSION["status"] !== "playing") {
            $this->showOver();
            return;
        }

        if (!isset($_POST["guess"])) {
            $this->showGame();
            return;
        }



        $guess = $_POST["guess"];
        $guesses = $_SESSION["guesses"];
        $categories = $_SESSION["categories"];
        $words = $_SESSION["words"];

        $guess_word_indices = explode(" ", $guess);
        $guess_word_indices = array_unique($guess_word_indices);

        $key = array_search("", $guess_word_indices);
        if ($key !== false) {
            unset($guess_word_indices[$key]);
        }

        $valid_guess_indices = [];
        foreach ($guess_word_indices as $idx) {

            if (is_numeric($idx) && array_key_exists($idx, $words)) {
                array_push($valid_guess_indices, $idx);
            }
        }
        if (count($valid_guess_indices) === 0) {
            $this->showGame();
            return;
        }
        if (count($valid_guess_indices) > 4) {
            $valid_guess_indices = array_slice($valid_guess_indices, 0, 4);
        }
        $guessed_words = [];
        foreach ($valid_guess_indices as $idx) {
            array_push($guessed_words, $words[$idx]);
        }

        $category_scores = [];
        foreach ($categories as $category => $words) {
            $category_scores[$category] = 0;
            foreach ($words as $word) {
                if (in_array($word, $guessed_words)) {
                    $category_scores[$category] = $category_scores[$category] + 1;

                }
            }
        }
        asort($category_scores);
        $best_category = array_key_last($category_scores);
        $amount_missing_from_best = count($categories[$best_category]) - $category_scores[$best_category];
        array_push($_SESSION["guesses"], [
            "guessed_words" => $guessed_words,
            "amount_missing" => $amount_missing_from_best
        ]);
        if ($amount_missing_from_best === 0) {
            foreach ($categories[$best_category] as $word) {
                unset($_SESSION["words"][array_search($word, $_SESSION["words"])]);
            }
            if (count($_SESSION["words"]) === 0) {
                $_SESSION["status"] = "won";
                header("Location: ?command=over");
                exit();
            } else {
                $this->showGame();
            }
        } else {
            $all_guesses = [];
            foreach ($_SESSION["guesses"] as $guess) {
                $all_guesses = array_merge($all_guesses, $guess["guessed_words"]);
            }
            $all_guesses = array_unique($all_guesses);
            if (count($all_guesses) === 16) {
                $_SESSION["status"] = "lost";
                header("Location: ?command=over");
                exit();
            }
            $this->showGame();
        }

    }

    private function play() {
        $this->showGame();
    }

    private function showWelcome() {
        require('./welcome.php');
        exit();
    }

    private function showOver() {
        $status = $_SESSION["status"];
        if ($status === "playing") {
            $message = "Game ended early.";
            $guesses = $_SESSION["guesses"];
            $guess_count = count($guesses);
            $categories = $_SESSION["categories"];
            require('./over.php');
            exit();
        }
        $message = $status === "won" ? "You won!" : "You lost!";
        $guesses = $_SESSION["guesses"];
        $guess_count = count($guesses);
        $categories = $_SESSION["categories"];
        require('./over.php');
        exit();
    }

    private function showGame() {
        $name = $_SESSION["name"];
        $email = $_SESSION["email"];
        $guesses = $_SESSION["guesses"];
        $guess_count = count($guesses);
        $categories = $_SESSION["categories"];
        $words = $_SESSION["words"];
        if (!isset($_SESSION["name"]) || !isset($_SESSION["email"])) {
            $this->showWelcome();
            return;
        }
        if ($_SESSION["status"] !== "playing") {
            $this->showOver();
            return;
        }
        require('./game.php');
        exit();
    }

    private function showError() {
        require('./error.php');
        exit();
    }
}
