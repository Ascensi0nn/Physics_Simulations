import { start } from "./proj-motion.js"

const w = window.innerWidth;
const h = window.innerHeight; 
const elements = document.getElementsByClassName("cards")
const buffer = 15
const num_elements = elements.length
const box_width = Math.floor((0.8 * w + buffer - buffer * num_elements) / (num_elements))
const box_height = Math.floor(3 * box_width / 2)

function hideCards() {
  let cards = document.getElementsByClassName('cards')
  for (let i = 0; i < cards.length; i+=1) {
    cards[i].style.display = "none"
  }
}

function clickProjMotion() {
  hideCards()
  start()
}

function clickObjCollision() {

}

function clickPendulum() {

}

function clickElectricField() {

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
document.getElementById('collision-card').addEventListener('click', clickObjCollision)
document.getElementById('pendulum-card').addEventListener('click', clickPendulum)
document.getElementById('electric-field-card').addEventListener('click', clickElectricField)

document.addEventListener("keydown", function(event) {
  if (event.key == "Escape") {
    document.getElementById('proj-motion').style.display = "none"
    // add all canvases here


    let cards = document.getElementsByClassName('cards')
    for (let i = 0; i < cards.length; i+=1) {
      cards[i].style.display = "block"
    }
  }
})