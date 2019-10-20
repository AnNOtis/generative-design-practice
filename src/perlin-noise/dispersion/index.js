const r = 100

function setup() {
  createCanvas(windowWidth, windowHeight);

  background('#fff1c2');
  noStroke()
  colorMode(HSB, 100);
  blendMode(MULTIPLY);
  noiseDetail(2)
}

const count = 500
let y = 0

function draw() {
  blendMode(BLEND);
  background('#fff1c2')
  blendMode(MULTIPLY);
  translate(width / 2, height / 2);
  drawCircle(color(15, 100, 100), 1000)
  drawCircle(color(60, 100, 60), 0.4)
  drawCircle(color(0, 100, 80), 0.8)
  y += 0.01
  // noLoop()
}

function drawCircle(color, diff) {
  beginShape()
  fill(color)
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
