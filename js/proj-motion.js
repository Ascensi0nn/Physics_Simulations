// Constants
const background = document.getElementById('proj-motion')
const width = 1200
const height = 600
const gravity = -9.8
const c = document.getElementById('proj-motion-canvas')
c.width = width; 
c.height = height;
const ctx = c.getContext('2d')

//Ball
const ball = document.createElement('img')
const ballSize = 40
const ballStartingPos = [10, height - ballSize]
let ballPos = ballStartingPos
let ballPositions = []

// variables
let angle, vel, time, groundHeight, shot, ball_hit

//input
let leftDown = false
let rightDown = false
let upDown = false
let downDown = false

function initialize() {
  ball.src = "/images/ball.png"
  ball.classList.add('proj-ball')
  ball.style.left = ballPos[0] + 'px'
  ball.style.top = ballPos[1] + 'px'
  ball.style.width = ballSize + 'px'
  ball.style.height = ballSize + 'px'
  background.appendChild(ball)
}

function reset() {
  ballPos = [10, height - ballSize]
  time = 0
  shot = false
  ball_hit = false
  vel = 50
  angle = 45
  ballPositions = []
  groundHeight = height - ballSize
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
}

function changeValues() {
  if (leftDown && angle < 90) {
    angle += 1
  } if (rightDown && angle > 0) {
      angle -= 1   
  } if (upDown) {
    vel += 1
  } if (downDown) {
    vel -= 1
  }
}

function radians(num) {
  return num * (Math.PI / 180)
}

function degrees(num) {
  return num * (180 / Math.PI)
}

function moveBall() {
  let vel_x = vel * Math.cos(radians(angle))
  let vel_yi = -1 * vel * Math.sin(radians(angle))

  let currentVel_y = -1 * (vel_yi - gravity * time)

  if (!ball_hit) {
    if (currentVel_y < 0 && ballPos[1] + ballSize >= height && time > 0.1) {
      ballPos[1] = groundHeight - ballSize
      let t;
      /*if (height - ballStartingPos[1] < groundHeight) {
        t = (-1 * vel_yi + Math.sqrt((Math.pow(vel_yi, 2) + 2 * gravity * (height - ballStartingPos[1] - groundHeight)))) / (-1 * gravity)
      }*/
      
      t = 2 * vel_yi / gravity
      
      ballPos[0] = ballStartingPos[0] + vel_x * t
      ballPos[1] = groundHeight
      ball_hit = true
    }
    else {
      ballPos[0] = vel_x * time + ballStartingPos[0]
      ballPos[1] = vel_yi * time - 0.5 * gravity * Math.pow(time, 2) + ballStartingPos[1]
      time += 0.1
    }
    ballPositions.push([ballPos[0], ballPos[1]])
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
  let vals = document.getElementById('text')
  vals.innerText = `X position: ${Math.round((ballPos[0] - ballStartingPos[0] + Number.EPSILON) * 100) / 100}m
Y position: ${Math.round((-1 * (ballPos[1] - ballStartingPos[1]) + Number.EPSILON) * 100) / 100}m
Initial Velocity: ${Math.round((vel + Number.EPSILON) * 100) / 100}m/s
Angle: ${Math.round((angle + Number.EPSILON) * 100) / 100} degrees
Height: ${(Math.round((height- ballPos[1] - ballSize + Number.EPSILON) * 100) / 100)}m
Ground Height: ${height - groundHeight - ballSize}m`
  vals.style.margin = '0em 1'
}

function drawSpeedArrows() {
  const lineConstant = 1
  const lineWidth = 3
  const arrowConstant = 6

  const vel_x = vel * Math.cos(radians(angle))
  const vel_y = vel * Math.sin(radians(angle)) + gravity * time
  const xLineLength = vel_x / lineConstant
  const yLineLength = vel_y / lineConstant

  ctx.beginPath()
  ctx.lineWidth = lineWidth

  let currentAngle = degrees(Math.atan(vel_y / vel_x))

  // X
  ctx.moveTo(ballPos[0] + ballSize / 2, ballPos[1] + ballSize / 2)
  ctx.lineTo(ballPos[0] + ballSize / 2 + xLineLength, ballPos[1] + ballSize / 2)
  ctx.moveTo(ballPos[0] + ballSize / 2 + xLineLength, ballPos[1] + ballSize / 2)
  ctx.lineTo(ballPos[0] + ballSize / 2 + xLineLength - arrowConstant, ballPos[1] + ballSize / 2 + arrowConstant)
  ctx.moveTo(ballPos[0] + ballSize / 2 + xLineLength, ballPos[1] + ballSize / 2)
  ctx.lineTo(ballPos[0] + ballSize / 2 + xLineLength - arrowConstant, ballPos[1] + ballSize / 2 - arrowConstant)

  // Y
  let pt1, pt2, a_pt1, a1_pt2, a2_pt2;
  if (vel_y > 0) {
    pt1 = [ballPos[0] + ballSize / 2, ballPos[1] + ballSize / 2]
    pt2 = [ballPos[0] + ballSize / 2, ballPos[1] + ballSize / 2 - yLineLength]
    a_pt1 = [ballPos[0] + ballSize / 2, ballPos[1] + ballSize / 2 - yLineLength]
    a1_pt2 = [ballPos[0] + ballSize / 2 - arrowConstant, ballPos[1] + ballSize / 2 - yLineLength + arrowConstant]
    a2_pt2 = [ballPos[0] + ballSize / 2 + arrowConstant, ballPos[1] + ballSize / 2 - yLineLength + arrowConstant]
  }
  else {
    pt1 = [ballPos[0] + ballSize / 2, ballPos[1] + ballSize / 2]
    pt2 = [ballPos[0] + ballSize / 2, ballPos[1] + ballSize / 2 - yLineLength]
    a_pt1 = [ballPos[0] + ballSize / 2, ballPos[1] + ballSize / 2 - yLineLength]
    a1_pt2 = [ballPos[0] + ballSize / 2 - arrowConstant, ballPos[1] + ballSize / 2 - yLineLength - arrowConstant]
    a2_pt2 = [ballPos[0] + ballSize / 2 + arrowConstant, ballPos[1] + ballSize / 2 - yLineLength - arrowConstant]
  }

  ctx.moveTo(pt1[0], pt1[1]); ctx.lineTo(pt2[0], pt2[1])
  ctx.moveTo(a_pt1[0], a_pt1[1]); ctx.lineTo(a1_pt2[0], a1_pt2[1])
  ctx.moveTo(a_pt1[0], a_pt1[1]); ctx.lineTo(a2_pt2[0], a2_pt2[1])

  // DIAGONAL
  ctx.moveTo(ballPos[0] + ballSize / 2, ballPos[1] + ballSize / 2)
  ctx.lineTo(ballPos[0] + ballSize / 2 + xLineLength, ballPos[1] + ballSize / 2 - yLineLength)
  let p_1 = [ballPos[0] + ballSize / 2 + xLineLength + arrowConstant * Math.cos(radians(currentAngle + 135)), ballPos[1] + ballSize / 2 - yLineLength - arrowConstant * Math.sin(radians(currentAngle + 135))]
  let p_2 = [ballPos[0] + ballSize / 2 + xLineLength + arrowConstant * Math.cos(radians(currentAngle - 135)), ballPos[1] + ballSize / 2 - yLineLength - arrowConstant * Math.sin(radians(currentAngle - 135))]

  ctx.moveTo(ballPos[0] + ballSize / 2 + xLineLength, ballPos[1] + ballSize / 2 - yLineLength)
  ctx.lineTo(p_1[0], p_1[1])
  ctx.moveTo(ballPos[0] + ballSize / 2 + xLineLength, ballPos[1] + ballSize / 2 - yLineLength)
  ctx.lineTo(p_2[0], p_2[1])
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
  ball.style.left = ballPos[0] + 'px'
  ball.style.top = ballPos[1] + 'px'
}

export function projGameLoop() {
  if (shot) {
    moveBall()
  }
  else {
    changeValues()
  }
  drawWindow()
}

export function projStart() {
  document.getElementById('proj-motion').style.display = "block"

  initialize()
  reset()
  
  document.addEventListener("keydown", keyDownHandler, false)
  document.addEventListener("keyup", keyUpHandler, false)
  document.addEventListener("keydown", function(event) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(event.code) > -1) {
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