/* eslint-disable @typescript-eslint/no-unused-vars */
import { fetchWord } from "./wordlewords.ts";
import { html, node } from "./taggedTemplates.ts";

function getFromLocalStorage(key: string) {
  const raw = localStorage.getItem(key);
  if (raw === null) return undefined;
  return JSON.parse(raw);
}

const currentGame = getFromLocalStorage("currentGame");
const gameStats = getFromLocalStorage("gameStats");
if (gameStats === undefined)
  localStorage.setItem("gameStats", JSON.stringify([]));

console.log(gameStats);
console.log(currentGame);

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

class Game {
  word: string;
  status: "won" | "lost" | "playing";
  guesses: Guess[];

  constructor(word: string) {
    this.word = word;
    console.log(word);
    this.status = "playing";
    this.guesses = [];
  }

  async reset() {
    const currentStats = getFromLocalStorage("gameStats");
    localStorage.setItem(
      "gameStats",
      JSON.stringify(currentStats?.concat(this) ?? [this]),
    );
    this.word = await fetchWordOrThrow();
    guessList.innerHTML = "";
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

const game = currentGame ?? new Game(await fetchWordOrThrow());

function GuessListItem({ guess }: { guess: Guess }) {
  const lengthMessage = guess.tooLong
    ? "Too long"
    : guess.tooShort
    ? "Too short"
    : "Correct length";
  return html`
    <li
      class="flex flex-wrap items-center justify-between gap-2 border border-gray-200 p-2"
    >
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

function addToGuessList(guess: Guess) {
  guessList.appendChild(GuessListItem({ guess: guess }));
}

function onGuess(e: SubmitEvent) {
  e.preventDefault();
  const guess = guessInput.value;
  if (guess.length === 0) {
    alert("Please enter a guess");
    return;
  }
  if (!guess.match(/^[A-Za-z]+$/)) {
    alert("Please enter only letters");
    return;
  }
  guessInput.value = "";
  const guessObj = game.parseGuess(guess);
  addToGuessList(guessObj);
  return false;
}

function newGame() {
  game.reset();
}

function GameStatsList() {
  if (!gameStats || gameStats.length == 0)
    return html`<p>No previous games</p>`;
  const elems = gameStats.map(
    (game: Game) => html`
      <li>
        <h3>${game.word}</h3>
        <p>${game.status}</p>
      </li>
    `,
  );
  const parentUl = document.createElement("ul");
  parentUl.append(...elems);
  return html`
    <ul>
      ${parentUl}
    </ul>
  `;
}

function Root() {
  console.log("rendering root");
  return html`
    <div class="grid h-full w-full max-md:grid-rows-3 md:grid-cols-3">
      <div
        id="game"
        class="h-full space-y-2 p-4 max-md:row-span-2 md:col-span-2"
      >
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
        <h2>Game</h2>
        <ul id="guesses"></ul>
        <form id="guess-form">
          <label for="guess-input">Enter a guess:</label>
          <div>
            <input
              id="guess-input"
              type="text"
              class="rounded-md border border-gray-400 p-2"
            />
            <button
              id="guess-button"
              class="rounded-md border border-gray-400 p-2"
            >
              Guess
            </button>
          </div>
        </form>
      </div>
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
      <div class="h-full w-full bg-gray-100">
        <h2>Stats</h2>
        ${GameStatsList()}
      </div>
    </div>
  `;
}

document.body.replaceChildren(Root());

const guessForm = document.querySelector("#guess-form")! as HTMLFormElement;
const guessList = document.querySelector("#guesses")!;
const guessInput = document.querySelector("#guess-input")! as HTMLInputElement;
const newGameButton = document.querySelector(
  "#new-game-button",
)! as HTMLButtonElement;

guessForm.addEventListener("submit", onGuess);
newGameButton.addEventListener("click", newGame);
