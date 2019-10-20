const r = 100

function setup() {
  createCanvas(windowWidth, windowHeight);

  background(0);
  strokeWeight(10)
  colorMode(HSB, 100);
  noiseDetail(2)
}

const count = 500
let y = 0

function draw() {
  blendMode(BLEND);
  background(0)
  blendMode(SCREEN);
  translate(width / 2, height / 2);

  for (let i = 5; i >= 0; i--) {
    drawCircle(color(i * 10, 80, 80), i * 0.1)
  }
  y += 0.01
}

function drawCircle(color, diff) {
  beginShape()
  stroke(color)
  noFill()
  for (let i = 0; i <= count; i++) {
    const deg = (TWO_PI / count) * (i % count)

    const nr = noise(
      (sin(deg) + 1) * 0.4,
      (cos(deg) + 1) * 0.4,
      y + diff
    ) * 100 + r
    vertex(
      sin(deg) * nr,
      cos(deg) * nr
    )
  }
  endShape()
}
