if (!localStorage.higtScoreStore) {
  localStorage.higtScoreStore = "0";
}
let playSpacing = document.querySelector(".space-play");
let displayScore = document.getElementById("score");
let highScore = document.getElementById("high-score");
let foodX = Math.floor(Math.random() * 40) + 1;
let foodY = Math.floor(Math.random() * 40) + 1;
let headX = 5;
let headY = 10;
let changeX = 0,
  changeY = 0;
let snakeBody = [];
let gameOver = false;
let stopInterval;
let score = 0;
let controler = Array.from(document.querySelectorAll(".controler div"));
highScore.innerHTML = `High Score: ${localStorage.higtScoreStore}`;

function changeDirectionOfSnake(e) {
  if (e.key === "ArrowUp" && changeY != 1) {
    changeX = 0;
    changeY = -1;
  }
  if (e.key === "ArrowDown" && changeY != -1) {
    changeX = 0;
    changeY = 1;
  }
  if (e.key === "ArrowLeft" && changeX != 1) {
    changeX = -1;
    changeY = 0;
  }
  if (e.key === "ArrowRight" && changeX != -1) {
    changeX = 1;
    changeY = 0;
  }
  changeStat();
}

function changeFoodSite() {
  foodX = Math.floor(Math.random() * 40) + 1;
  foodY = Math.floor(Math.random() * 40) + 1;
}

function gameOverFunvtion() {
  clearInterval(stopInterval);
  if (score > parseInt(localStorage.higtScoreStore)) {
    localStorage.higtScoreStore = `${score}`;
  }
  alert("Game Over Click Ok To Play Again..");
  location.reload();
}
controler.forEach((key) => {
  key.addEventListener("click", () =>
    changeDirectionOfSnake({ key: key.dataset.key })
  );
});

function changeStat() {
  if (gameOver) return gameOverFunvtion();
  let playing = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;
  if (headX == foodX && headY == foodY) {
    changeFoodSite();
    score++;
    displayScore.innerHTML = `Score: ${score}`;
    snakeBody.push([foodX, foodY]);
  }
  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }
  headX += changeX;
  headY += changeY;
  if (headX > 40 || headX < 0 || headY > 40 || headY < 0) {
    gameOver = true;
  }
  snakeBody[0] = [headX, headY];
  for (let i = 0; i < snakeBody.length; i++) {
    playing += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
    if (
      i != 0 &&
      snakeBody[0][1] == snakeBody[i][1] &&
      snakeBody[0][0] == snakeBody[i][0]
    ) {
      gameOver = true;
    }
  }
  playSpacing.innerHTML = playing;
}
changeFoodSite();
changeStat();
stopInterval = setInterval(changeStat, 200);
document.addEventListener("keydown", changeDirectionOfSnake);
