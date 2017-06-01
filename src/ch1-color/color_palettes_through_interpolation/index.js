/* eslint-disable no-undef, no-unused-vars */

const HSB_BLEND_MODE = 1
const RGB_BLEND_MODE = 2
let mode = RGB_BLEND_MODE
const tileCountX = 2
const tileCountY = 10
const colorsLeft = new Array(tileCountY)
const colorsRight = new Array(tileCountY)

function setup() {
  const cvs = createCanvas(300, 300)
  cvs.parent('container')
  background(360)
  colorMode(HSB, 360, 100, 100)
  noStroke()
  suffleColors()
  frameRate(12)
}

function draw() {
  const mx = mouseX > width ? width : (mouseX < 0 ? 0 : mouseX)
  const my = mouseY > height ? height : (mouseY < 0 ? 0 : mouseY)

  const gridCountX = map(mx, 0, width, 2, 100)
  const gridCountY = map(my, 0, height, 2, tileCountY)
  const gridWidth = width / gridCountX
  const gridHeight = height / gridCountY

  for (let ty = 0; ty < gridCountY; ty += 1) {
    const colorLeft = colorsLeft[ty]
    const colorRight = colorsRight[ty]

    for (let tx = 0; tx < gridCountX; tx += 1) {
      const colorWeight = map(tx, 0, gridCountX, 0, 1)

      let interColor
      if (mode === RGB_BLEND_MODE) {
        colorMode(RGB, 255, 255, 255, 255)
        interColor = lerpColor(colorLeft, colorRight, colorWeight)
        colorMode(HSB, 360, 100, 100, 100)
      } else {
        interColor = lerpColor(colorLeft, colorRight, colorWeight)
      }

      fill(interColor)
      rect(tx * gridWidth, ty * gridHeight, gridWidth, gridHeight)
    }
  }
}

function suffleColors() {
  for (let i = 0; i < tileCountY; i++) {
    colorsLeft[i] = color(random(0, 60), random(0, 100), 100)
    colorsRight[i] = color(random(160, 190), 100, random(0, 100))
  }
}

function mouseReleased() {
  suffleColors()
}

function keyReleased() {
  switch (key) {
    case '1':
      mode = HSB_BLEND_MODE
      break
    case '2':
      mode = RGB_BLEND_MODE
      break
    default:
  }
}
