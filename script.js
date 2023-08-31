const choices = ["Rock", "Paper", "Scissor"];
const compBtns = Array.from(document.querySelectorAll(".compBtn"))
const playerBtns = Array.from(document.querySelectorAll(".playerBtn"));
const playerScore = document.querySelector("#playerScore");
const compScore = document.querySelector("#compScore");
const result = document.querySelector(".result");
const reset = document.createElement('button');
const userChoice = document.querySelector(".playerChoice");
const compChoice = document.querySelector(".compChoice");
let winAudio = document.querySelector('#win');
let lostAudio = document.querySelector('#lost');
let clickSound = document.querySelector('#click');
let playerWin = 0;
let compWin = 0;

function computerChoice() {
  let choice = Math.floor(Math.random() * choices.length);
  choice = choices[choice];
  document.querySelector(".compChoice").textContent =
    "Computer chose: " + choice;
  const btns = Array.from(document.querySelectorAll(".compBtn"));
  btns.forEach(btn => btn.addEventListener('transitionend',removeTransition))
  if (choice == choices[0]) {
    btns[0].classList.add("play");
    btns[1].classList.remove("play");
    btns[2].classList.remove("play");
  } else if (choice == choices[1]) {
    btns[1].classList.add("play");
    btns[0].classList.remove("play");
    btns[2].classList.remove("play");
  } else if (choice == choices[2]) {
    btns[2].classList.add("play");
    btns[1].classList.remove("play");
    btns[0].classList.remove("play");
  }
  return choice;
}

function playerChoice() {
  const btns = Array.from(document.querySelectorAll(".playerBtn"));
  btns.forEach((btn) =>
    btn.addEventListener("click", (e) => {
      
      const userChoice = e.target.textContent;
      document.querySelector(".playerChoice").textContent = "You chose: " + userChoice;
      if (e.target == btns[0]) {
        btns[0].classList.add("play");
        btns[1].classList.remove("play");
        btns[2].classList.remove("play");
      } else if (e.target == btns[1]) {
        btns[1].classList.add("play");
        btns[0].classList.remove("play");
        btns[2].classList.remove("play");
      } else if (e.target == btns[2]) {
        btns[2].classList.add("play");
        btns[1].classList.remove("play");
        btns[0].classList.remove("play");
      }
      computerChoice();
      const computerSelection = computerChoice();
      const result = document.querySelector(".result");
      result.style.cssText = 'background-color: lightgrey;'
      const playerScore = document.querySelector("#playerScore");
      const compScore = document.querySelector("#compScore");
      playerScore.textContent = `Player score: ${playerWin}`;
      compScore.textContent = `Computer score: ${compWin}`;
      if (userChoice == computerSelection) {
        result.textContent = `Round Tie (You and computer chose same)`;
      } else if (userChoice == "Rock" && computerSelection == "Scissor") {
        result.textContent = `You Won! Rock beats Scissor`;
        playerScore.textContent = `Player score: ${++playerWin}`;
      } else if (userChoice == "Paper" && computerSelection == "Rock") {
        result.textContent = `You Won! Paper beats Rock`;
        playerScore.textContent = `Player score: ${++playerWin}`;
      } else if (userChoice == "Scissor" && computerSelection == "Paper") {
        result.textContent = `You Won! Scissor beats Paper`;
        playerScore.textContent = `Player score: ${++playerWin}`;
      } else if (userChoice == "Scissor" && computerSelection == "Rock") {
        result.textContent = `Computer won! You Lost! Rock beats Scissor`;
        compScore.textContent = `Computer score: ${++compWin}`;
      } else if (userChoice == "Paper" && computerSelection == "Scissor") {
        result.textContent = `Computer won! You Lost! Scissor beats Paper`;
        compScore.textContent = `Computer score: ${++compWin}`;
      } else if (userChoice == "Rock" && computerSelection == "Paper") {
        result.textContent = `Computer won! You Lost! Paper beats Rock`;
        compScore.textContent = `Computer score: ${++compWin}`;
      }
      clickSound.play();
      if (playerWin == 5) {
        result.textContent = `Hurray!! You won! You have reached 5 points. GAME OVER!!`;
        result.style.cssText = 'background-color: green; color: white; padding: 1rem'
        btns.forEach((btn)=>{
          btn.disabled = true;
          btn.classList.remove('play');
          btn.style.cursor = 'not-allowed';
        });
        const compBtns = Array.from(document.querySelectorAll(".compBtn"));
        compBtns.forEach((btn)=>{
          btn.disabled = true;
          btn.classList.remove('play');
          btn.style.cursor = 'not-allowed';
        });
        gameOver();
        winAudio.currentTime = 0;
        winAudio.play();
      }
      if (compWin == 5) {
        result.textContent = `Oops you lost!! Computer reached 5 points GAME OVER!!`;
        result.style.cssText = 'background-color: red; color: white; padding: 1rem'
        btns.forEach((btn)=>{
          btn.disabled = true;
          btn.classList.remove('play')
          btn.style.cursor = 'not-allowed'
        });
        const compBtns = Array.from(document.querySelectorAll(".compBtn"));
        compBtns.forEach((btn)=>{
          btn.disabled = true;
          btn.classList.remove('play')
          btn.style.cursor = 'not-allowed'
        });
        gameOver();
        lostAudio.currentTime = 0;
        lostAudio.play();
      }
    })
  );
}
playerChoice();

function gameOver(params) {
  reset.textContent = 'Play Again';
  reset.classList.add('reset');
  document.body.append(reset)
  reset.addEventListener('click',reStart)
}

function reStart(params) {
  compBtns.forEach((btn)=>{
    btn.disabled = false;
    btn.style.cursor = '';
  })
  playerBtns.forEach((btn)=>{
    btn.disabled = false;
    btn.style.cursor = 'pointer';
  })
  playerScore.textContent = ''
  compScore.textContent = '';
  result.textContent = '';
  result.style.cssText = '';
  userChoice.textContent = '';
  compChoice.textContent = '';
  playerWin = 0;
  compWin = 0;
  lostAudio.pause()
  winAudio.pause();
  reset.parentNode.removeChild(reset);
}
playerBtns.forEach((btn)=>{
  btn.addEventListener('transitionend',removeTransition)
})

function removeTransition(e) {
  if (e.propertyName == 'transform') {
    e.target.classList.remove('play');
  }
  return
}

