/* ==========================================================================
 *                               CONSTANTS
 * ========================================================================== */

const userPaddle = {
  x: 0.98,
  y: 0.425
};

const cpuPaddle = {
  x: 0.02,
  y: 0.425
};

const ball = {
  x: 0.4,
  y: 0.5
};

const ballDirection = {
  x: 1,
  y: 1
};

const score = {
  userScore: 0,
  cpuScore: 0
};

/* ==========================================================================
 *                                GAME STATE
 * ========================================================================== */
var frame = 0;

var gameState = {
  userPaddle: userPaddle,
  cpuPaddle: cpuPaddle,
  ball: ball,
  score: score
};

/* ==========================================================================
 *                                FUNCTIONS
 * ========================================================================== */

//Function to reset default game state
function resetGameState() {
  userPaddle.x = 0.98;
  userPaddle.y = 0.425;
  cpuPaddle.x = 0.02;
  cpuPaddle.y = 0.425;
  ball.x = 0.4;
  ball.y = 0.5;
  userScore = 0;
  cpuScore = 0;
}

//Function to update game state to next frame
function nextFrame(userState) {
  moveUser(userState);
  moveCPU();
  moveBall();
  checkGoal();
  frame++;
}

//Funciton to move player paddles based on input
function moveUser(input) {
  let dy;
  switch (input) {
    case "UP":
      dy = Math.random() * 0.2;
      userPaddle.y += userPaddle.y + dy <= 0.85 ? dy : 0;
      break;
    case "DOWN":
      dy = Math.random() * 0.2;
      userPaddle.y -= userPaddle.y - dy >= 0 ? dy : 0;
      break;
    default:
      if (frame % 690 == 0) {
        if (Math.random() > 0.5) {
          userPaddle.y += Math.random();
        } else {
          userPaddle.y -= Math.random();
        }
      }
  }
}


//Function to move ball
function moveBall() {
  //Check if ball is colliding with paddle
  if (checkCollisionX()) {
    ballDirection.x *= -1;
  }

  //Check if ball is colliding with top or bottom
  if (checkCollisionY()) {
    ballDirection.y *= -1;
  }

  ball.x += (ballDirection.x * 0.015);
  ball.y += (ballDirection.y * 0.015);
}

//Function to move computer paddle based on position of ball
function moveCPU() {
  if ((cpuPaddle.y < ball.y) && (cpuPaddle.y + 0.05 + 0.15 <= 1 + 0.04)) {
    cpuPaddle.y += 0.05;
  }

  if ((cpuPaddle.y > ball.y) && (cpuPaddle.y - 0.05 >= 0 - 0.04)) {
    cpuPaddle.y -= 0.05;
  }
}

//Function to check if goal was scored
function checkGoal() {
  if (ball.x + 0.013 < 0) {
    score.userScore++;
  }

  if (ball.x > 1) {
    score.cpuScore++;
  }
}

function checkCollisionX() {
  if (ballDirection.x > 0) { //Ball moving towards user
    return (ball.x + 0.013 + 0.015 >= userPaddle.x);
  }

  return (ball.x <= cpuPaddle.x + 0.015); //Ball moving towards CPU
}

function checkCollisionY() {
  if (ballDirection.y < 0) { //Ball moving down
    return (ball.y + 0.013 <= 0);
  }

  return (ball.y >= 1); //Ball moving up
}
