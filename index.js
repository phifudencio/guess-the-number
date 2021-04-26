const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

start();

//Guessing Game Plan
//Make 3 modes = { Computer vs Computer,
//Player vs Computer, Player vs Player}

//Function Start the game mode
async function start() {
  let start = await ask(
    `Hello Player Please Choose a mod between the numbers 1 ,2 ,3,\n\n 1 - Computer vs Computer,\n 2 - Player vs Computer,\n 3 - Player vs Player\n >_`
  );

  /*  console.log(typeof start); */
  if (start === "1") {
    startCxC();
  } else if (start === "2") {
    startPxC();
  } else if (start === "3") {
    startPxP();
  }
}

//Computer vs Computer
//robot  choose a random number
//robot  tries to guess

//Player vs Computer
//2 options = {Player guees the computer number || Computer guess the player number}

//Player vs Player
// Player tries to find the other persons number.

//Number of tries minumin 7?

function random(minNum, maxNum) {
  let rMax = maxNum - minNum + 1;
  return minNum + Math.floor(Math.random() * rMax);
}

//Start CxC
async function startCxC() {
  let minNum = 1;
  let maxNum = 100; // number max to be generate
  let guessCount = 7; // Number of Guesses atempt
  let randomNum = random(minNum, maxNum); // Generates random number

  console.log(`\n\nMegatron : I WILL WIN BY ANY MEANS! AT ANY COST!\n`);
  console.log(
    `Optimus Prime: Even If You Defeat Me, Megatron. Others Will Rise To Defeat Your Tyranny! \n`
  );

  console.log(
    "Optimus Prime : Pick your number lets see whos is going to win Megatron!\n"
  );

  let choosePlayer = await ask(
    "Witch robot you want to choose? 1 - Optimus Prime \n2 - Megatron\n>_"
  );
  let player1;
  let player2;
  if (choosePlayer == 1) {
    player1 = "Optimus Prime";
    player2 = "Megatron";
  } else if (choosePlayer == 2) {
    player2 = "Optimus Prime";
    player1 = "Megatron";
  }

  startGame();
  function startGame() {
    let minNum = 1;
    let maxNum = 100;
    let guessCount = 7;
    let randomNum = random(minNum, maxNum);
    let play1Num = randomNum;
    let play2Num = random(minNum, maxNum);
    console.log(
      `${player1} : I'm thinking of a number between 1-100, witch one is it?\n`
    );

    while (guessCount >= 1) {
      console.log(` ${player2}: Is it  ${play2Num} ? \n`);
      if (play2Num === play1Num) {
        console.log(`Is equal!`);
        process.exit();
      } else if (guessCount <= 1) {
        console.log(`byeee!`);
        process.exit();
      } else if (play1Num > play2Num) {
        console.log(`${player1} : My number is higher!`);
        guessCount--;
        minNum = play2Num;
        play2Num = random(minNum, maxNum);
      } else if (play1Num < play2Num) {
        console.log(`${player1} : My number lower!`);
        guessCount--;
        maxNum = play2Num;
        play2Num = random(minNum, maxNum);
      }
    }
  }
}

//Player X Computer Mode
async function startPxC() {
  let mode = await ask(
    `What mode you want to play?\n 1 - You Guess\n2 - Computer Guess`
  );

  if (mode === "1") {
    startGuess();
  } else if (mode === "2") {
    startCGuess();
  }
}
async function startGuess() {
  let minNum = 1;
  let maxNum = 100; // number max to be generate
  let guessCount = 7; // Number of Guesses atempt
  let randomNum = random(minNum, maxNum); // Generates random number
  let computerNum = randomNum;
  console.log(
    `I'm thinking of a number between 1 - 100, witch number is it ?\n`
  );

  while (guessCount >= 1) {
    let guess = parseInt(await ask(`>_`));
    if (guess === computerNum) {
      console.log("You win!");
      process.exit();
    } else if (guessCount <= 0) {
      // This condition only trigs if i use it before.
      process.exit();
    } else if (guess > computerNum) {
      guessCount--;
      console.log("My number is lower");
    } else if (guess < computerNum) {
      guessCount--;
      console.log("My number is higher");
    } else {
      console.log("Dont try to cheat!!!");
      process.exit();
    }
  }
}

async function startCGuess() {
  let minNum = 1;
  let maxNum = 100; // number max to be generate
  let guessCount = 7; // Number of Guesses atempt
  let randomNum = random(minNum, maxNum); // Generates random number
  let playerNum = await ask(
    `Please choose a number between 1- 100 , i will try to guees it. \n>_`
  );
  while (guessCount >= 1) {
    let computerGuess = await ask(`Is your number ${randomNum} ?`);

    if (computerGuess === "yes" || computerGuess === "y") {
      console.log("I won as always !!!");
      process.exit();
    } else if (computerGuess === "no" || computerGuess === "n") {
      let pc = await ask(`Is it Higher or lower?`);

      if (pc === "lower" || pc === "l") {
        guessCount--;
        maxNum = randomNum;
        randomNum = random(minNum, maxNum);
      } else if (pc === "higher" || pc === "l") {
        guessCount--;
        minNum = randomNum;
        randomNum = random(minNum, maxNum);
      }
    } else if (randomNum === playerNum) {
      console.log(`I won!!!`);
    } else if (guessCount === 0) {
      console.log("You lost!");
      process.exit();
    } else {
      return;
    }
  }
}

//Player x Player Mode
async function startPxP() {}
