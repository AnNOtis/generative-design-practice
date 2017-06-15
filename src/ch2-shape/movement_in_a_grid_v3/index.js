/* eslint-disable no-undef, no-unused-vars */
const tile = 20
const ratio = 1
let sizeX, sizeY

function setup() {
  const cns = createCanvas(500, 500)
  cns.parent('container')
  frameRate(12)

  smooth()
  colorMode(HSB, 360, 100, 100, 100)

  sizeX = width/tile
  sizeY = height/tile
}

function draw() {
  background(360)
  translate(width/tile/2, height/tile/2)
  const mx = constrain(mouseX, 0, width)
  const my = constrain(mouseY, 0, height)

  loopGrid((posX, posY) => {
    const shiftX = random(-mx, mx) / tile
    const shiftY = random(-my, my) / tile

    noStroke()
    fill(0, 0, 0, 50)
    ellipse(posX + shiftX, posY + shiftY, width/tile * ratio, height/tile * ratio)
  })

  loopGrid((posX, posY) => {
    stroke('#999')
    strokeWeight(1)
    fill('white')
    ellipse(posX, posY, width/tile/2, height/tile/2)
  })
}

function loopGrid(process) {
  for (let i = 0; i < tile; i++) {
    for (let j = 0; j < tile; j++) {
      const posX = sizeX * j
      const posY = sizeY * i

      process(posX, posY)
    }
  }
}
