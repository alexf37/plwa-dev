<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Not Found</title>
  </head>
  <body>
  <?php
  if ($_SERVER['REQUEST_URI'] == "/xrk4np/404/" || $_SERVER['REQUEST_URI'] == "/xrk4np/404/index.php" || $_SERVER['REQUEST_URI'] == "/xrk4np/404") {
    echo "custom 404";
    http_response_code(200);
  } else {
    echo "default 404";
    http_response_code(404);
  }
    ?>
  </body>
</html>
