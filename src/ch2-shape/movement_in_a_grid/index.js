/* eslint-disable no-undef, no-unused-vars */
const tile = 20
const ratio = 0.8
let sizeX, sizeY

function setup() {
  const cns = createCanvas(500, 500)
  cns.parent('container')
  frameRate(12)

  sizeX = width/tile
  sizeY = height/tile
}

function draw() {
  background(360)
  translate(width/tile/2, height/tile/2)
  const mx = constrain(mouseX, 0, width)
  const my = constrain(mouseY, 0, height)

  strokeWeight(my/tile/3)

  for (let i = 0; i < tile; i++) {
    for (let j = 0; j < tile; j++) {
      const posX = sizeX * j
      const posY = sizeY * i

      const shiftX = random(-mx, mx) / tile
      const shiftY = random(-mx, mx) / tile

      ellipse(posX + shiftX, posY + shiftY, my/tile * ratio, my/tile * ratio)
    }
  }
}
