<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome</title>
    <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
    <link rel="stylesheet" type="text/css" href="/xrk4np/tailwind.css" />
</head>

<body>
    <main class="grid place-content-center h-full">
        <div class="space-y-4">
            <h1 class="text-4xl">Welcome!</h1>
            <h2 class="text-slate-600 text-2xl">Please enter your name and email to proceed.</h2>
            <form action="?command=login" class="flex flex-col gap-2" method="POST">
                <label for="name-input">Name</label>
                <input required type="text" name="name" id="name-input" class="bg-slate-50 border px-3 py-2 rounded-lg"
                    minlength="1">
                <label for="email-input">Email</label>
                <input required type="email" name="email" id="email-input"
                    class="bg-slate-50 border px-3 py-2 rounded-lg" minlength="1">
                <button class="bg-blue-600 px-3 py-2 rounded-lg text-white">
                    Submit
                </button>
            </form>
        </div>
    </main>
</body>

</html>