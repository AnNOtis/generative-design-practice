const dots = []
// const factor = 0.008
const factor = 0.01
const size = Math.min(innerWidth * 0.8, 500)
const count = size * 6
const radius = size * 0.8 / 2
const paintDistance = 2

function setup() {
  createCanvas(size, size);
  background(255);
  // noiseSeed(24);
  // noiseSeed(37);
  // noiseSeed(37);
  noiseDetail(2)
  colorMode(HSB, 100)
  // strokeWeight(2)
  // stroke(0)
  // fill(13, 10, 100)
  // ellipse(width / 2, height / 2, radius * 2 + 1)

  for (let i = 0; i < count; i++) {
    if (i < count * 0.996) {
      dots.push(new Dot(radius, [55, 80], 20, 5))
    } else {
      dots.push(new Dot(radius, [10, 20], 100, 60))
    }
  }
}

function draw() {
  for (let i = 0; i < dots.length; i++) {
    const dot = dots[i]
    dot.update()
    dot.draw()
  }
}

class Dot {
  constructor(radius, colorRange, brightness, alpha) {
    const r = random(TWO_PI)
    const x = width / 2 + sin(r) * radius
    const y = height / 2 + cos(r) * radius
    this.pos = createVector(x, y)
    this.prev = createVector(x, y)
    this.color = color(255)
    this.deadCount = 0
    this.radius = radius
    this.colorRange = colorRange
    this.alpha = alpha
    this.brightness = brightness
  }

  update() {
    const noize = noise(this.pos.x * factor, this.pos.y * factor)
    this.v = p5.Vector.fromAngle(noize * TWO_PI + (this.deadCount * PI))
    this.v.setMag(paintDistance)
    this.color = color(
      map(noize, 0, 1, ...this.colorRange),
      100,
      this.brightness,
      this.alpha
    )
    this.prev = this.pos.copy()
    this.pos = this.pos.add(this.v)

    if (dist(width / 2, height / 2, this.pos.x, this.pos.y) > this.radius + 2) {
      this.deadCount++
    }
  }

  draw() {
    if (this.deadCount > 4) {
      return
    }
    if (
      dist(width / 2, height / 2, this.pos.x, this.pos.y) > this.radius ||
      dist(width / 2, height / 2, this.prev.x, this.prev.y) > this.radius
    ) {
      return
    }

    strokeWeight(1)
    stroke(this.color)
    line(this.prev.x, this.prev.y, this.pos.x, this.pos.y)
  }
}

function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    save('pic.jpg')
  }
}
