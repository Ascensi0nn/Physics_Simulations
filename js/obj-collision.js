// Constants
const background = document.getElementById('obj-collision')
const width = 1200
const height = 600
const c = document.getElementById('obj-canvas')
c.width = width;
c.height = height;
const ctx = c.getContext('2d')

//Balls
const ballSize = 40
const ballStartingMass = 50
const ballBlueStartingPos = [width - ballSize - 10, height - ballSize]
const ballRedStartingPos = [10, height - ballSize]

const ballBlue = document.getElementById('blue-obj-collision-ball')
let ballBlueMass = ballStartingMass
let ballBluePos = ballBlueStartingPos

const ballRed = document.getElementById('red-obj-collision-ball')
let ballRedMass = ballStartingMass
let ballRedPos = ballRedStartingPos

// variables
let ballBlueVel, ballRedVel, shot, contact

//input
let leftDown = false
let rightDown = false
let upDown = false
let downDown = false
let wDown = false
let aDown = false
let sDown = false
let dDown = false

function initialize() {
  ballBlue.style.left = ballBluePos[0] + 'px'
  ballBlue.style.top = ballBluePos[1] + 'px'
  ballBlue.style.width = ballSize + 'px'
  ballBlue.style.height = ballSize + 'px'

  ballRed.style.left = ballRedPos[0] + 'px'
  ballRed.style.top = ballRedPos[1] + 'px'
  ballRed.style.width = ballSize + 'px'
  ballRed.style.height = ballSize + 'px'
}

function reset() {
  ballBluePos = [width - ballSize - 10, height - ballSize]
  ballBlueMass = ballStartingMass
  ballRedPos = [10, height - ballSize]
  ballRedMass = ballStartingMass
  shot = false
  contact = false
  ballBlueVel = -10
  ballRedVel = 10
}

function keyDownHandler(event) {
  if (event.key == "ArrowLeft") {
    leftDown = true
  } if (event.key == "ArrowRight") {
    rightDown = true
  } if (event.key == "ArrowUp") {
    upDown = true
  } if (event.key == "ArrowDown") {
    downDown = true
  }
  if (event.key == "w") {
    wDown = true
  } if (event.key == "a") {
    aDown = true
  } if (event.key == "s") {
    sDown = true
  } if (event.key == "d") {
    dDown = true
  }
}

function keyUpHandler(event) {
  if (event.key == "ArrowLeft") {
    leftDown = false
  } if (event.key == "ArrowRight") {
    rightDown = false
  } if (event.key == "ArrowUp") {
    upDown = false
  } if (event.key == "ArrowDown") {
    downDown = false
  }
  if (event.key == "w") {
    wDown = false
  } if (event.key == "a") {
    aDown = false
  } if (event.key == "s") {
    sDown = false
  } if (event.key == "d") {
    dDown = false
  }
}

function changeValues() {
  if (leftDown) {
    ballBlueVel -= 1
  } if (rightDown && ballBlueVel < 0) {
    ballBlueVel += 1   
  } if (upDown) {
    ballBlueMass += 1
  } if (downDown && ballBlueMass > 0) {
    ballBlueMass -= 1
  }
  if (aDown && ballRedVel > 0) {
    ballRedVel -= 1
  } if (dDown) {
    ballRedVel += 1   
  } if (wDown) {
    ballRedMass += 1
  } if (sDown && ballRedMass > 0) {
    ballRedMass -= 1
  }
}

function moveBalls() {
  if (ballRedPos[0] + ballSize > ballBluePos[0] && !contact) {
    let t1_b = ballBlueVel * (ballBlueMass - ballRedMass) / (ballBlueMass + ballRedMass)
    let t2_b = ballRedVel * (2 * ballRedMass) / (ballBlueMass + ballRedMass)
    let ballBlueFinal = t1_b + t2_b
    let t1_r = ballBlueVel * (2 * ballBlueMass) / (ballBlueMass + ballRedMass)
    let t2_r = ballRedVel * (ballRedMass - ballBlueMass) / (ballBlueMass + ballRedMass)
    let ballRedFinal = t1_r + t2_r

    ballRedVel = ballRedFinal
    ballBlueVel = ballBlueFinal
    contact = true
  }

  const velConst = 5
  //RED MOVEMENT
  if (ballRedPos[0] >= width - ballSize) {
    ballRedPos[0] = width - ballSize
    ballRedVel = 0
  }
  else if (ballRedPos[0] < 0) {
    ballRedPos[0] = 0
    ballRedVel = 0
  }
  else {
    ballRedPos[0] += ballRedVel / velConst
  }

  //BLUE MOVEMENT
  if (ballBluePos[0] >= width - ballSize) {
    ballBluePos[0] = width - ballSize
    ballBlueVel = 0
  }
  else if (ballBluePos[0] < 0) {
    ballBluePos[0] = 0
    ballBlueVel = 0
  }
  else {
    ballBluePos[0] += ballBlueVel / velConst
  }
  
}

function drawGraph() {
  let tileSize = 50
  ctx.beginPath()
  ctx.lineWidth = 1
  
  for (let i = 0; i < 1200; i += tileSize) {
    ctx.moveTo(i, 0);
    ctx.lineTo(i, height)
  }

  for (let k = 0; k < height; k += tileSize) {
    ctx.moveTo(0, k)
    ctx.lineTo(width, k)
  }
  ctx.stroke()
}

function drawText() {
  let blueVals = document.querySelector('.blue-text')
  blueVals.innerText = `
Blue Velocity: ${Math.round((ballBlueVel + Number.EPSILON) * 100) / 100}m/s
Blue Mass: ${ballBlueMass}kg`
  blueVals.style.margin = '0em 1'
  let redVals = document.querySelector('.red-text')
  redVals.innerText = `
Red Velocity: ${Math.round((ballRedVel + Number.EPSILON) * 100) / 100}m/s
Red Mass: ${ballRedMass}kg`
  redVals.style.margin = '0em 1'
}

function drawSpeedArrows() {
  const lineConstant = 1
  const lineWidth = 3
  const arrowConstant = 6

  const blueLineLength = ballBlueVel / lineConstant
  const redLineLength = ballRedVel / lineConstant

  ctx.beginPath()
  ctx.lineWidth = lineWidth

  // red
  ctx.moveTo(ballRedPos[0] + ballSize, ballRedPos[1] + ballSize / 2)
  ctx.lineTo(ballRedPos[0] + ballSize + redLineLength, ballRedPos[1] + ballSize / 2)
  ctx.moveTo(ballRedPos[0] + ballSize + redLineLength, ballRedPos[1] + ballSize / 2)
  ctx.lineTo(ballRedPos[0] + ballSize + redLineLength - arrowConstant, ballRedPos[1] + ballSize / 2 + arrowConstant)
  ctx.moveTo(ballRedPos[0] + ballSize + redLineLength, ballRedPos[1] + ballSize / 2)
  ctx.lineTo(ballRedPos[0] + ballSize + redLineLength - arrowConstant, ballRedPos[1] + ballSize / 2 - arrowConstant)

  // blue
  ctx.moveTo(ballBluePos[0], ballBluePos[1] + ballSize / 2)
  ctx.lineTo(ballBluePos[0] + blueLineLength, ballBluePos[1] + ballSize / 2)
  ctx.moveTo(ballBluePos[0] + blueLineLength, ballBluePos[1] + ballSize / 2)
  ctx.lineTo(ballBluePos[0] + blueLineLength + arrowConstant, ballBluePos[1] + ballSize / 2 + arrowConstant)
  ctx.moveTo(ballBluePos[0] + blueLineLength, ballBluePos[1] + ballSize / 2)
  ctx.lineTo(ballBluePos[0] + blueLineLength + arrowConstant, ballBluePos[1] + ballSize / 2 - arrowConstant)

  ctx.stroke()
}

function drawBackground() {
  ctx.fillStyle = "beige"
  ctx.fillRect(0, width, 0, height)
  ctx.clearRect(0, 0, width, height)
}

function drawWindow() {
  drawBackground()
  drawGraph()
  drawSpeedArrows()
  drawText()
  ballBlue.style.left = ballBluePos[0] + 'px'
  ballBlue.style.top = ballBluePos[1] + 'px'
  ballRed.style.left = ballRedPos[0] + 'px'
  ballRed.style.top = ballRedPos[1] + 'px'
}

export function objGameLoop() {
  if (shot) {
    moveBalls()
  }
  else {
    changeValues()
  }
  drawWindow()
}

export function objStart() {
  document.getElementById('obj-collision').style.display = "block"

  initialize()
  reset()
  
  document.addEventListener("keydown", keyDownHandler, false)
  document.addEventListener("keyup", keyUpHandler, false)
  document.addEventListener("keydown", function(event) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight", "w", "a", "s", "d"].indexOf(event.code) > -1) {
      event.preventDefault();
    }
    switch (event.key) {
      case " ":
        shot = true
        break;
      case "r":
        reset()
        break;
      default:
        return;
    }
  })
}
