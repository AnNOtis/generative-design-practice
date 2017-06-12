/* eslint-disable no-undef, no-unused-vars */

const tileCount = 20
let actStrokeCap

function setup() {
  const cns = createCanvas(500, 500)
  cns.parent('container')
  colorMode(RGB)
  actStrokeCap = ROUND
  noLoop()
}

function draw() {
  background(360)
  strokeCap(actStrokeCap)

  const mx = constrain(mouseX, 1, width)
  const my = constrain(mouseY, 1, height)

  const sizeX = width / tileCount
  const sizeY = height / tileCount
  const lineValueLeft = constrain(mx / tileCount, 1, sizeX)
  const opacityLeft = map(sizeX-lineValueLeft, 1, sizeX, 50, 100)
  const lineValueRight = constrain(my / tileCount, 1, sizeY)
  const opacityRight = map(sizeY-lineValueRight, 1, sizeY, 50, 100)

  for (let x = 0; x < tileCount; x++) {
    for (let y = 0; y < tileCount; y++) {
      const direction = round(random(0, 2))

      if (direction === 1) {
        strokeWeight(lineValueLeft)
        stroke(0, 0, 0, opacityLeft)
        line(x*sizeX, y*sizeY, (x+1)*sizeX, (y+1)*sizeY)
      }
      if (direction === 2) {
        strokeWeight(lineValueRight)
        stroke(0, 0, 0, opacityRight)
        line((x+1)*sizeX, y*sizeY, x*sizeX, (y+1)*sizeY)
      }
    }
  }
}

function keyReleased () {
  if (key === "1") {
    actStrokeCap = ROUND
    redraw()
  }
  if (key === "2") {
    actStrokeCap = SQUARE
    redraw()
  }
  if (key === "3") {
    actStrokeCap = PROJECT
    redraw()
  }
}

function mouseClicked() {
  redraw()
}
