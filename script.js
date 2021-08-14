const d_select = document.querySelector.bind(document)
const d_select_id = document.getElementById.bind(document)

// Set up Constants & Variables
const LEFT_KEY = 37;
const UP_KEY = 38;
const RIGHT_KEY = 39;
const DOWN_KEY = 40;
const ESC_KEY = 27;

var playerState = 'NOTHING'
var timerID = null;
let clientWidth = window.innerWidth || document.body.clientWidth
let clientHeight = window.innerHeight || document.body.clientHeight
let leftPaddle = d_select_id('left-paddle')
let rightPaddle = d_select_id('right-paddle')
let ball = d_select_id('ball')

var gameState = {cpuPaddle: {x: 0.1, y: 0.3}, userPaddle: {x: 0.1, y: 0.3}, ball: {x: 0.4, y: 0.5}} // TODO: DELETE THIS DUMMY GAME STATE (TO BE IMPLEMENTED BY CLAIRE)
function resetGameState() {  // TODO: delete this (TO BE IMPLEMENTED BY CLAIRE)
    gameState.cpuPaddle.y = 0.3
    gameState.userPaddle.y = 0.3
    gameState.ball.x = 0.4
    gameState.ball.y = 0.5
}
function nextFrame() {       // TODO: delete this (TO BE IMPLEMENTED BY CLAIRE)
    gameState.cpuPaddle.y += 0.003
    gameState.userPaddle.y += 0.003
    gameState.ball.x += 0.002
}

function keyDown(event) {
    switch (event.which) {
        case UP_KEY:
            playerState = 'UP'
            break;
        case DOWN_KEY:
            playerState = 'DOWN'
            break;
    }
}

function keyUp(event) {
    playerState = 'NOTHING'
}

function mainLoop() {
    // advance game state to the next frame
    nextFrame(playerState)
    // update GUI based on updated game state
    matchGUItoGameState()
    //
    if (false) { // TODO: add flag that indicates whether game should stop/end
        clearInterval(timerID)
    }
}

function matchGUItoGameState(){
    leftPaddle.setAttribute('y', (1 - gameState.cpuPaddle.y) * 100 + '%')
    rightPaddle.setAttribute('y', (1 - gameState.userPaddle.y) * 100 + '%')
    ball.setAttribute('x', gameState.ball.x * 100 + '%')
    ball.setAttribute('y', (1 - gameState.ball.y) * 100 + '%')
}

function startNewGame() {
    resetGameState()
    matchGUItoGameState()
    // start game's main loop
    timerID = setInterval(mainLoop, 33)
}

startNewGame()
