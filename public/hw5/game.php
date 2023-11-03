<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Connections</title>
    <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
    <link rel="stylesheet" type="text/css" href="/xrk4np/tailwind.css" />
</head>

<body>
    <main class="min-h-full grid place-content-center w-full p-8">
        <div class="space-y-2">
            <h1 class="text-4xl font-bold">Connections</h1>
            <h2 class="text-slate-600 text-2xl font-medium">Hi there,
                <?= $name ?>
            </h2>
            <div class="flex justify-between items-center">
                <h2 class="text-slate-600 text-lg">Logged in as
                    <?= $email ?>
                </h2>
                <button type="button" class="bg-red-600 px-3 py-2 rounded-lg text-white ">
                    <a href="?command=over">End Game</a>
                </button>
            </div>

            <div id="words" class="grid grid-cols-4 grid-rows-4">
                <?php
                foreach ($words as $idx => $word) {
                    echo "<div class='border-2 border-slate-600 rounded-md p-4 m-2 flex items-center justify-center'>" . "$idx. " . $word . "</div>";
                }

                ?>
            </div>
            <div class="mb-4">
                <form action="?command=guess" method="POST" class="space-x-2">
                    <label for="guess-input" class="font-bold text-lg">Guess: </label>
                    <input required placeholder="Submit a guess" type="text" name="guess" id="guess-input"
                        class="bg-slate-50 border px-3 py-2 rounded-lg" minlength="1" autocomplete="off">
                    <button class="bg-green-500 px-3 py-2 rounded-lg text-white ">
                        Guess
                    </button>
                </form>
            </div>

            <h2 class="text-2xl font-medium mb-2">Previous guesses:</h2>
            <ol class="divide-y mb-2" id="guesses">
                <?php

                foreach ($guesses as $idx => $guess) {
                    $guessed_words = implode(", ", $guess["guessed_words"]);
                    $idx++;
                    ?>
                    <li class="flex items-center gap-4 py-1">
                        <h3>
                            <?= "$idx. " ?>
                        </h3>
                        <div>
                            <p>Guessed words:
                                <?= $guessed_words ?>
                            </p>
                            <p>
                                <?= ((4 - $guess["amount_missing"]) >= 2) ? ($guess["amount_missing"] === 0 ? "Found all in category" : "Missing {$guess["amount_missing"]} phrase(s)") : "No phrases from the same category in guess" ?>
                            </p>
                        </div>
                    </li>
                <?php } ?>
            </ol>
            <h3 class="font-medium text-lg">Total previous guesses:
                <span class="font-semibold">
                    <?= $guess_count ?>
                </span>
            </h3>
        </div>
    </main>
</body>

</html>