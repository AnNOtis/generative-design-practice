let scl
let cols
let rows
let noises
let flying = 0
let sclSlider
let rotateSlider
let heightSlider

function setup() {
  createCanvas(800, 600, WEBGL)
  background(0)
  angleMode(DEGREES)
  createSpan("Scale:")
  sclSlider = createSlider(5, 100, 10);
  createSpan("height:")
  heightSlider = createSlider(1, 10, 3, 0.1);
  createSpan("Rotate:")
  rotateSlider = createSlider(0, 90, 40);
  scl = 20

  // noiseDetail(10, 0.65)
  smooth()
  frameRate(10)
}

function draw() {
  scl = sclSlider.value()
  rotate = rotateSlider.value()
  const heightMult = heightSlider.value()
  cols = floor(width / scl)
  rows = floor(height / scl)
  noises = [...new Array(cols)].map(() => new Array(rows))

  rotateX(rotate)
  let yoff = flying
  for (let y = 0; y < rows; y++) {
    let xoff = 0
    for (let x = 0; x < cols; x++) {
      noises[y][x] = map(noise(xoff, yoff), 0, 1, -scl * heightMult, scl * heightMult)
      xoff += 0.4
    }
    yoff += 0.2
  }

  background(0)
  noFill()
  noStroke()
  push()
  translate(-width / 2, -height / 3)
  for (let y = 0; y < rows - 1; y++) {
    strokeWeight(map(y / rows, 0, 1, 1, 1.5))
    stroke(200, (y / rows) * 100)
    beginShape(TRIANGLE_STRIP)
    for (let x = 0; x < cols; x++) {
      vertex(x * scl, y * scl, noises[y][x])
      vertex(x * scl, (y + 1) * scl, noises[y + 1][x])
    }
    endShape()
  }
  pop()

  flying -= 0.2
}

// function mousePressed() {
//   noLoop()
// }
