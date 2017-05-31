/* eslint-disable no-undef, no-unused-vars */

let segmentCount = 360
const radius = 300

function setup() {
  const cns = createCanvas(600, 600)
  cns.parent('container')
  frameRate(12)
  background(360)
}

function draw() {
  colorMode(HSB, 360, width, height)
  background(360)

  const angleSegment = 360 / segmentCount
  const cx = width / 2
  const cy = height / 2
  beginShape(TRIANGLE_FAN)
  vertex(cx, cy)
  for (let angle = 0; angle <= 360; angle += angleSegment) {
    const vx = cx + (cos(radians(angle)) * radius)
    const vy = cy + (sin(radians(angle)) * radius)
    vertex(vx, vy)
    stroke(angle, mouseX, height - mouseY)
    fill(angle, mouseX, height - mouseY)
  }
  endShape()
}

function keyReleased() {
  switch (key) {
    case '1':
      segmentCount = 360
      break
    case '2':
      segmentCount = 45
      break
    case '3':
      segmentCount = 24
      break
    case '4':
      segmentCount = 12
      break
    case '5':
      segmentCount = 6
      break
    default:
  }
}
