// modified (with permission) from professor hott
export async function fetchWord() {
  try {
    const response = await fetch(
      "https://cs4640.cs.virginia.edu/api/wordleword.php",
    );
    if (!response.ok) {
      console.log(
        "When trying to get a new word, the server returned an HTTP error code.",
      );
    }
    return await response.text();
  } catch (error) {
    console.log(
      "When trying to get a new word, the connection to the server failed.",
    );
  }
}
