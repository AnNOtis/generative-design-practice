let w = 500
let h = 500
let scl = 70
let cols = Math.floor(w / scl)
let rows = Math.floor(h / scl)
let curves = [...new Array(rows)].map(() => new Array(cols))
let angle = -90
let padding = 20
let isGuided = true

function setup() {
  createCanvas(w, h)
  background(0)
  noFill()
  stroke(255)
  angleMode(DEGREES)
}

function draw() {
  background(0);

  const d = scl - padding
  const r = d / 2


  if (isGuided) {
    for (let i = 1; i < cols; i++) {
      const currentAngle = angle * i
      const x = cos(currentAngle) * r
      const y = sin(currentAngle) * r

      push()
      translate(i * scl + scl / 2, scl / 2)
      stroke(100)
      line(x, 0 - scl / 2, x, height)
      circle(0, 0, d);
      circle(x, y, 5);
      pop()

      push()
      translate(scl / 2, i * scl + scl / 2)
      stroke(100)
      circle(0, 0, d);
      circle(x, y, 5);
      // line(0, 0, x, y)
      line(0 - scl / 2, y, width, y)
      pop()
    }
  }

  for (let y = 1; y < rows; y++) {
    for (let x = 1; x < cols; x++) {
      curves[y][x] = curves[y][x] || new Curve()
      const curve = curves[y][x]

      push()
      translate((x + 0.5) * scl, (y + 0.5) * scl)
      const xPos = cos(angle * x) * r
      const yPos = sin(angle * y) * r

      curve.add(createVector(xPos, yPos))
      curve.show()
      pop()
    }
  }

  angle += 1

  if (angle === 270) {
    for (let y = 1; y < rows; y++) {
      for (let x = 1; x < cols; x++) {
        curves[y][x].reset()
      }
    }
  }
}

function Curve() {
  this.pos = createVector(0, 0)
  this.paths = []

  this.add = function (v) {
    this.paths.push(v)
  }

  this.show = function () {
    this.paths.forEach((path, index) => {
      const prev = this.paths[index - 1]
      if (!prev) return
      line(prev.x, prev.y, path.x, path.y)
    })

    if (!isGuided) return
    const lastPath = this.paths[this.paths.length - 1]
    if (lastPath) {
      push()
      // stroke(100)
      fill(255)
      circle(lastPath.x, lastPath.y, 5)
      pop()
    }
  }

  this.reset = function () {
    this.paths = []
  }
}

function mousePressed() {
  isGuided = !isGuided
}
