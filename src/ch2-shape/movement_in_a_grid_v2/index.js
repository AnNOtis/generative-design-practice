/* eslint-disable no-undef, no-unused-vars */
const tile = 20
const ratio = 1
let sizeX, sizeY

function setup() {
  const cns = createCanvas(500, 500)
  cns.parent('container')
  frameRate(12)

  sizeX = width/tile
  sizeY = height/tile
  noStroke()
  smooth()
  colorMode(HSB, 360, 100, 100, 100)
  fill(195, 63, 38, 60)
}

function draw() {
  background(360)

  const mx = constrain(mouseX, 0, width)
  const my = constrain(mouseY, 0, height)

  for (let i = 0; i < tile; i++) {
    for (let j = 0; j < tile; j++) {
      const posX = sizeX * j
      const posY = sizeY * i

      beginShape()
      vertex(posX+rndShift(mx), posY+rndShift(my))
      vertex(posX+sizeX+rndShift(mx), posY+rndShift(my))
      vertex(posX+sizeX+rndShift(mx), posY+sizeY+rndShift(my))
      vertex(posX+rndShift(mx), posY+sizeY+rndShift(my))
      endShape(CLOSE)
    }
  }
}

function rndShift(mousePosition) {
  return mousePosition/tile * random(-1, 1)
}
