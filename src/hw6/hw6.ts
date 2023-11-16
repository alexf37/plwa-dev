/* eslint-disable @typescript-eslint/no-unused-vars */
import { fetchWord } from "./wordlewords.ts";
import { html } from "./taggedTemplates.ts";

const guessForm = () =>
  document.querySelector("#guess-form")! as HTMLFormElement;
const guessList = () => document.querySelector("#guesses")! as HTMLFormElement;
const guessInput = () =>
  document.querySelector("#guess-input")! as HTMLInputElement;
const newGameButton = () =>
  document.querySelector("#new-game-button")! as HTMLButtonElement;
const clearHistoryButton = () =>
  document.querySelector("#clear-history-button")! as HTMLButtonElement;

function getFromLocalStorage(key: string) {
  const raw = localStorage.getItem(key);
  if (raw === null) return undefined;
  return JSON.parse(raw);
}

function getCurrentGame() {
  const currentGame = getFromLocalStorage("currentGame") as Game | undefined;
  return currentGame;
}

function getGameStats() {
  const gameStats = getFromLocalStorage("gameStats") as Game[] | undefined;
  return gameStats;
}

if (getGameStats() === undefined)
  localStorage.setItem("gameStats", JSON.stringify([]));

async function fetchWordOrThrow() {
  const word = (await fetchWord())?.toLocaleLowerCase();
  if (word === undefined) {
    throw new Error("Word was undefined");
  }
  return word;
}

type Guess = {
  text: string;
  correct: boolean;
  correctLetters: number;
  correctPositions: number;
  tooLong: boolean;
  tooShort: boolean;
};

type GameStatus = "won" | "lost" | "playing";

class Game {
  word: string;
  status: GameStatus;
  guesses: Guess[];

  constructor(
    word: string,
    status: GameStatus = "playing",
    guesses: Guess[] = [],
  ) {
    this.word = word;
    console.log(word);
    this.status = status;
    this.guesses = guesses;
  }

  async end() {
    if (this.status !== "won") this.status = "lost";
    const currentStats = getFromLocalStorage("gameStats");
    localStorage.setItem(
      "gameStats",
      JSON.stringify(currentStats?.concat(this) ?? [this]),
    );
    localStorage.removeItem("currentGame");
  }

  save() {
    localStorage.setItem("currentGame", JSON.stringify(this));
  }

  makeGuess(guess: string) {
    const parsedGuess = this.parseGuess(guess);
    this.guesses.push(parsedGuess);

    if (parsedGuess.correct) {
      this.status = "won";
    }
    this.save();

    renderRoot();
  }

  parseGuess(guess: string) {
    guess = guess.toLocaleLowerCase();
    if (this.word == guess) {
      return {
        text: guess,
        correct: true,
        correctLetters: this.word.length,
        correctPositions: this.word.length,
        tooLong: false,
        tooShort: false,
      };
    }
    const guessLetters = guess.split("");
    const wordLetters = this.word.split("");

    const tooLong = guessLetters.length > wordLetters.length;
    const tooShort = guessLetters.length < wordLetters.length;

    const correctLetters = guessLetters.filter((letter) =>
      wordLetters.includes(letter),
    ).length;
    const correctPositions = guessLetters.filter(
      (ltr, idx) => wordLetters[idx] === ltr,
    ).length;

    return {
      text: guess,
      correct: false,
      correctLetters,
      correctPositions,
      tooLong,
      tooShort,
    };
  }
}

async function loadGame() {
  return (
    (() => {
      const currentGame = getCurrentGame();
      return currentGame
        ? new Game(currentGame.word, currentGame.status, currentGame.guesses)
        : undefined;
    })() ?? new Game(await fetchWordOrThrow())
  );
}

let game = new Game("");
loadGame().then((g) => {
  game = g;
  renderRoot();
});

function GuessListItem({ guess }: { guess: Guess }) {
  const lengthMessage = guess.tooLong
    ? "Too long"
    : guess.tooShort
    ? "Too short"
    : "Correct length";
  return html`
    <li class="flex flex-wrap items-center justify-between gap-2 p-2">
      <div class="flex w-1/2 items-center gap-2">
        <h3 class="max-w-full break-words">${guess.text}</h3>
        <span class="text-xs text-gray-500">
          ${guess.correct ? "✅" : "❌"}
        </span>
      </div>
      <div>
        <div>
          <span class="text-gray-500">Correct letters:</span>
          <span class="font-bold"
            >${guess.correctLetters.toLocaleString()}</span
          >
        </div>
        <div>
          <span class="text-gray-500">Correct positions:</span>
          <span class="font-bold"
            >${guess.correctPositions.toLocaleString()}</span
          >
        </div>
        <div>
          <span class="font-bold">${lengthMessage}</span>
        </div>
      </div>
    </li>
  `;
}

function onGuess(e: SubmitEvent) {
  e.preventDefault();
  const guess = guessInput().value;
  if (guess.length === 0) {
    alert("Please enter a guess");
    return;
  }
  if (!guess.match(/^[A-Za-z]+$/)) {
    alert("Please enter only letters");
    return;
  }
  guessInput().value = "";
  game.makeGuess(guess);
  return false;
}

async function newGame() {
  game.end();
  game = new Game(await fetchWordOrThrow());
  renderRoot();
}

async function clearHistory() {
  await newGame();
  localStorage.setItem("gameStats", JSON.stringify([]));
  renderRoot();
}

function GameStatsList() {
  const gameStats = getGameStats();
  if (!gameStats || gameStats.length == 0)
    return html`<p>No previous games</p>`;

  let wonInARow = 0;
  for (const game of gameStats.reverse()) {
    if (game.status === "won") wonInARow++;
    else break;
  }
  const avgGuesses =
    gameStats.reduce((acc, curr) => {
      return acc + curr.guesses.length;
    }, 0) / gameStats.length;
  return html`
    <div>
      <p>
        <b>Games Won: </b>${gameStats
          .filter((game) => game.status === "won")
          .length.toLocaleString()}
      </p>
      <p><b>Games Played: </b>${gameStats.length.toLocaleString()}</p>
      <p><b>Winning Streak Length: </b>${wonInARow.toLocaleString()}</p>
      <p><b>Avg. Guesses per Game: </b>${avgGuesses.toLocaleString()}</p>
    </div>
  `;
}

function Root() {
  console.log("rendering root");
  if (game.word === "") return html`<div>Loading...</div>`;
  return html`
    <div class="grid w-full md:grid-cols-3">
      <div id="game" class="space-y-2 p-4 max-md:row-span-2 md:col-span-2">
        <div class="flex items-center justify-between">
          <h1 class="py-2 text-3xl font-bold">Evil Wordle</h1>
          <button
            type="button"
            class="rounded-md border border-gray-200 bg-green-500 p-2 font-bold tracking-wide text-white hover:bg-green-600"
            id="new-game-button"
          >
            New Game
          </button>
        </div>
        <h2 class="font-semibold">Previous Guesses</h2>
        <ul
          id="guesses"
          class="max-h-96 overflow-y-auto rounded-md border border-gray-200"
        >
          ${(() => {
            const e = document.createElement("div");
            e.classList.add("divide-y", "divide-gray-200");
            const guesses = game.guesses.map((guess) =>
              GuessListItem({ guess }),
            );
            if (guesses.length === 0) {
              return html`<p class="p-2"><i>No previous guesses</i></p>`;
            } else e.append(...guesses);
            return e as Element;
          })()}
        </ul>
        <form id="guess-form" class="space-y-2">
          <label for="guess-input">Enter a guess:</label>
          <div>
            <input
              id="guess-input"
              type="text"
              autocomplete="off"
              class="rounded-md border border-gray-400 p-2 disabled:bg-red-100"
              ${getCurrentGame()?.status === "won" ? "disabled" : ""}
            />
            <button
              id="guess-button"
              class="rounded-md border border-gray-400 p-2 disabled:bg-red-100"
              ${getCurrentGame()?.status === "won" ? "disabled" : ""}
            >
              Guess
            </button>
          </div>
        </form>
      </div>

      <div class="w-full bg-gray-100 p-4 pb-8 md:col-span-1">
        <div class="flex items-center justify-between">
          <h1 class="py-2 text-3xl font-bold">Stats</h1>
          <button
            type="button"
            class="rounded-md border border-gray-200 bg-red-500 p-2 font-bold tracking-wide text-white hover:bg-red-600"
            id="clear-history-button"
          >
            Clear History
          </button>
        </div>
        ${GameStatsList()}
      </div>
    </div>
  `;
}

function renderRoot() {
  document.body.replaceChildren(Root());
  guessForm().addEventListener("submit", onGuess);
  newGameButton().addEventListener("click", newGame);
  clearHistoryButton().addEventListener("click", clearHistory);
  guessInput().focus();
  guessList().scrollTop = guessList().scrollHeight;
}

window.addEventListener("load", () => {
  renderRoot();
});

//note: this means that if the user has two concurrent games open,
// the last one closed will be the one saved, even if it is
// out of date. this also makes for weird behavior if the user
// tries playing two games at once
window.addEventListener("unload", () => {
  game.save();
});
