import { projStart } from "./proj-motion.js"
import { projGameLoop } from "./proj-motion.js"
import { objStart } from "./obj-collision.js"
import { objGameLoop } from "./obj-collision.js"
import { pendulumStart } from "./pendulum.js"
import { pendulumGameLoop } from "./pendulum.js"

const w = window.innerWidth;
const h = window.innerHeight; 
const elements = document.getElementsByClassName("cards")
const buffer = 20
const num_elements = elements.length
const box_width = Math.floor((0.8 * w + buffer - buffer * num_elements) / (num_elements))
const box_height = Math.floor(3 * box_width / 2)
const framerate = 15

let projInterval;
let objInterval;
let pendulumInterval;

function hideCards() {
  let cards = document.getElementsByClassName('cards')
  for (let i = 0; i < cards.length; i+=1) {
    cards[i].style.display = "none"
  }
}

function logo() {
  const original = "apphysics"
  const originalHTML = "app<br>hys<br>ics"
  const lst = original.split('')
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'
  let iterations = 0

  const interval = setInterval(() => {
    for (let i = 0; i < original.length; i++) {
      if (lst[i] != " ") {
        let rand = alphabet[Math.floor(Math.random() * alphabet.length)]
        lst[i] = rand
      }
    }
    let str = lst.join('')
    str = str.replace(/(.{3})/g, '$1<br>');
    if (iterations >= original.length) {
      clearInterval(interval)
      str = originalHTML
    }
    document.getElementById('logo').innerHTML = str
    iterations += 1
  }, 60)
}

function clickProjMotion() {
  hideCards()
  projStart()
  clearInterval(projInterval)
  projInterval = setInterval(() => {
    projGameLoop()
  }, framerate)
}

function clickObjCollision() {
  objStart()
  hideCards()
  clearInterval(objInterval)
  objInterval = setInterval(() => {
    objGameLoop()
  }, framerate)
}

function clickPendulum() {
  pendulumStart()
  hideCards()
  clearInterval(pendulumInterval)
  pendulumInterval = setInterval(() => {
    pendulumGameLoop()
  }, framerate)
}

function clickElectricField() {
  eFieldStart()
  hideCards()
  eFieldInterval = setInterval(() => {
    eFieldGameLoop()
  }, framerate)
}

for (let i = 0; i < elements.length; i += 1) {
  let id = elements[i].id
  let card = document.getElementById(id)
  card.style.width = box_width + 'px';
  card.style.height = box_height + 'px';
  card.style.left = (0.1 * w + i * (box_width + buffer)) + 'px';
  card.style.top = (200) + 'px';
}

document.getElementById('proj-card').addEventListener('click', clickProjMotion)
document.getElementById('obj-card').addEventListener('click', clickObjCollision)
document.getElementById('pendulum-card').addEventListener('click', clickPendulum)
document.getElementById('e-field-card').addEventListener('click', clickElectricField)
document.getElementById('logo').addEventListener('mouseover', logo)

document.addEventListener("keydown", function(event) {
  if (event.key == "Escape") {
    document.getElementById('proj-motion').style.display = "none"
    document.getElementById('obj-collision').style.display = "none"
    document.getElementById('pendulum').style.display = "none"
    // add all backgrounds here

    let cards = document.getElementsByClassName('cards')
    for (let i = 0; i < cards.length; i+=1) {
      cards[i].style.display = "block"
    }
  }
})