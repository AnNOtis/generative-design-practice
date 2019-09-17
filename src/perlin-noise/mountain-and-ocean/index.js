let w = 500
let h = 500
let rows = 50
let cols = 200

function ease(p, g) {
  if (p < 0.5) {
    return 0.5 * pow(2 * p, g);
  } else {
    return 1 - 0.5 * pow(2 * (1 - p), g);
  }
}

let t = 0

function setup() {
  createCanvas(w, h)
  background(255)
  noiseDetail(1)
  colorMode(HSB, 100)
  fill(255)
  strokeWeight(1)
}

function draw() {
  background(255)
  for (let i = 0; i < rows; i++) {
    const y = map(i, 0, rows - 1, 0, height);
    const alpha = map(y, 0, height, 10, 100)
    fill(map(y, 0, height, 50, 70), 40, map(y, 0, height, 50, 10), alpha);
    stroke(51, 8, 93, alpha)
    beginShape()
    vertex(-1, height + 10);
    for (let j = 0; j < cols; j++) {
      const x = map(j, 0, cols - 1, 0, width);
      const intense = ease(
        constrain(map(dist(x, y, width / 2, height * 0.6), 0, width / 2, 1, 0), 0, 1),
        2
      )
      // const yoff = noise(t + x * 0.03, y * 2) * intense * 100
      const scl = 0.01
      const r = 0.5
      const yoff = noise(
        100 * y + scl * x + t,
        r * cos(TWO_PI * t + i / 10),
        r * sin(TWO_PI * t + i / 10)
      ) * intense * 500
      vertex(x, y - yoff)
    }
    vertex(width, height + 3);
    endShape()
  }

  t += 0.03
}
