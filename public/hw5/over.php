<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Game Over</title>
    <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
    <link rel="stylesheet" type="text/css" href="/xrk4np/tailwind.css" />
</head>

<body>
    <main class="min-h-full grid place-content-center w-full p-8">
        <div class="flex flex-col gap-4 items-center">
            <h1 class="text-4xl font-semibold">
                <?= $message ?>
            </h1>
            <p class="text-xl font-medium">
                <?= "You made $guess_count guesses in total." ?>
            </p>
            <div class="flex gap-2">
                <button type="button" class="bg-blue-600 px-3 py-2 rounded-lg text-white ">
                    <a href="?command=login">Play Again</a>
                </button>
                <button type="button" class="bg-red-600 px-3 py-2 rounded-lg text-white ">
                    <a href="?command=logout">Exit</a>
                </button>
            </div>
            <div class="flex gap-3 divide-x">
                <?php
                foreach ($categories as $key => $cat) {
                    echo '<div class="px-2">';
                    echo "<h2 class='text-xl font-medium'>$key</h2>";
                    foreach ($cat as $word) {
                        echo "<p>$word</p>";
                    }
                    echo "</div>";
                }
                ?>
            </div>
        </div>
    </main>

</body>

</html>