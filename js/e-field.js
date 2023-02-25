// Constants
const background = document.getElementById('e-field')
const width = 1200
const height = 600
const c = document.getElementById('e-field-canvas')
c.width = width;
c.height = height;
const ctx = c.getContext('2d')

//Balls
const chargeSize = 80
const chargeLeftStartingPos = [width / 4 - chargeSize / 2, height / 2 - chargeSize / 2]
const startingCharge = 10
let chargeOfLeft, chargeOfRight
const chargeRightStartingPos = [3 * width / 4 - chargeSize / 2, height / 2 - chargeSize / 2]

const chargeLeft = document.getElementById('left-charge')
const chargeRight = document.getElementById('right-charge')
const k = 9 * Math.pow(10, 9)

//input
let leftDown = false
let rightDown = false
let aDown = false
let dDown = false

function reset() {
  chargeLeft.style.left = chargeLeftStartingPos[0] + 'px'
  chargeLeft.style.top = chargeLeftStartingPos[1] + 'px'
  chargeLeft.style.width = chargeSize + 'px'
  chargeLeft.style.height = chargeSize + 'px'
  chargeOfLeft = startingCharge

  chargeRight.style.left = chargeRightStartingPos[0] + 'px'
  chargeRight.style.top = chargeRightStartingPos[1] + 'px'
  chargeRight.style.width = chargeSize + 'px'
  chargeRight.style.height = chargeSize + 'px'
  chargeOfRight = -startingCharge
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

function radians(num) {
  return num * (Math.PI / 180)
}

function degrees(num) {
  return num * (180 / Math.PI)
}

function changeValues() {
  if (leftDown) {
    chargeOfRight -= 1
  } if (rightDown) {
    chargeOfRight += 1   
  } 
  if (aDown) {
    chargeOfLeft -= 1
  } if (dDown) {
    chargeOfLeft += 1
  } 
}

function findStartingPoints() {
  const mid = [chargeLeftStartingPos[0] + chargeSize / 2, chargeLeftStartingPos[1] + chargeSize / 2]
  const lines = 8
  const ang = 360 / lines
  const radius = 5
  let startingPointList = []

  for (let i = 0; i < lines; i++) {
    startingPointList[i] = [radius * Math.cos(radians(i * ang)) + mid[0], radius * Math.sin(radians(i * ang)) + mid[1]]
    drawCurvyLine(startingPointList[i])
  }
}

function drawCurvyLine(startingPoint) {
  const iterations = 10
  let point = startingPoint;

  for (let i = 0; i < iterations; i++) {
    const eField = getEFieldAt(point)
    let m = eField[0]
    let d = eField[1]

    // draw circle/line there
    const rad = 10
    ctx.beginPath()
    ctx.arc(point[0], point[1], rad, 0, 2 * Math.PI)
    ctx.stroke()


    const change = 10
    // change x/y of point
    console.log(d)
    if ((d <= 45 && d > 0) || (d <= 360 && d > 315)) {
      point[0] += change
    }
    else if (d <= 135 && d > 45) {
      point[1] += change
    }
    else if (d <= 225 && d > 135) {
      point[0] -= change
    }
    else if (d <= 315 && d > 225) {
      point[1] -= change
    }
  }
}

function getEFieldAt(point) {
  // middle of charge = chargePosition + chargeSize / 2
  const midLeft = [chargeLeftStartingPos[0] + chargeSize / 2, chargeLeftStartingPos[1] + chargeSize / 2]
  const midRight = [chargeRightStartingPos[0] + chargeSize / 2, chargeRightStartingPos[1] + chargeSize / 2]
  // Distance from charges = Square root of the sum of the difference of the x's squared and the difference of the y's squared
  let dLeft = Math.sqrt(Math.pow(point[0] - midLeft[0], 2) + Math.pow(point[1] - midLeft[1], 2))
  let dRight = Math.sqrt(Math.pow(point[0] - midRight[0], 2) + Math.pow(point[1] - midRight[1], 2))
  // E = kQ / r
  let eLeft = (k * chargeOfLeft) / Math.pow(dLeft, 2)
  let angLeft = degrees(Math.atan2(point[1] - midLeft[1], point[0] - midLeft[0]))
  let eRight = (k * chargeOfRight) / Math.pow(dRight, 2)
  let angRight = degrees(Math.atan2(point[1] - midRight[1], point[0] - midRight[1]))

  var x = eLeft * Math.cos(radians(angLeft)) + eRight * Math.cos(radians(angRight))
  var y = eLeft * Math.sin(radians(angLeft)) + eRight * Math.sin(radians(angRight))

  let magnitude = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
  let direction = Math.floor(degrees(Math.atan(y / x)))

  return [magnitude, direction]
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


function drawBackground() {
  ctx.fillStyle = "beige"
  ctx.fillRect(0, width, 0, height)
  ctx.clearRect(0, 0, width, height)
}

function drawWindow() {
  drawBackground()
  drawGraph()
  findStartingPoints()
  //drawSpeedArrows()
  //drawText()
  chargeLeft.style.left = chargeLeftStartingPos[0] + 'px'
  chargeLeft.style.top = chargeLeftStartingPos[1] + 'px'
  chargeRight.style.left = chargeRightStartingPos[0] + 'px'
  chargeRight.style.top = chargeRightStartingPos[1] + 'px'
}

export function eFieldGameLoop() {
  changeValues()
  drawWindow()
}

export function eFieldStart() {
  document.getElementById('e-field').style.display = "block"

  reset()
  
  document.addEventListener("keydown", keyDownHandler, false)
  document.addEventListener("keyup", keyUpHandler, false)
  document.addEventListener("keydown", function(event) {
    if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight", "w", "a", "s", "d"].indexOf(event.code) > -1) {
      event.preventDefault();
    }
    switch (event.key) {
      case "r":
        reset()
        break;
      default:
        return;
    }
  })
}
