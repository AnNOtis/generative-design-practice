const tile = 5
const minLength = 5
const angleCount = 5
const EAST = 0
const SOUTH = 1
const WEST = 2
const NORTH = 3

let noEnoughSpaceCount = 0
let direction = EAST
let angle
let stepSize = 2
let isReachBorder = false
let posX = 0
let posY = 0
let prePosX = posX
let prePosY = posY
let maxDist
function setup() {
  const cns = createCanvas(500, 500)
  cns.parent('container')
  frameRate(12)
  background(360)
  strokeCap(PROJECT)
  angle = getRandomAngle(direction)
  maxDist = dist(0, 0, width, height)
}


function draw() {
  if (noEnoughSpaceCount === 100) return noLoop()

  const iteratedCount = constrain(mouseX, 10, width)
  for (var i = 0; i <= iteratedCount; i++) {
    posX += cos(radians(angle)) * stepSize
    posY += sin(radians(angle)) * stepSize
    if (posX > (width - 5)) {
      direction = WEST
      isReachBorder = true
    } else if (posX < 5) {
      direction = EAST
      isReachBorder = true
    } else if (posY > (height - 5)) {
      direction = NORTH
      isReachBorder = true
    } else if (posY < 5) {
      direction = SOUTH
      isReachBorder = true
    }

    if (
      get(posX, posY).toString() != color(360).maxes.rgb.toString()
      || isReachBorder
    ) {
      angle = getRandomAngle(direction)
      const distance = dist(posX, posY, prePosX, prePosY)

      if (distance >= minLength) {
        strokeWeight(map(distance, 0, maxDist, 1, 20))
        stroke(0)
        line(posX, posY, prePosX, prePosY)
      } else {
        noEnoughSpaceCount +=1
      }

      prePosX = posX
      prePosY = posY
    }
    isReachBorder = false
  }
}

function getRandomAngle(direction) {
  const angle = (random(-angleCount, angleCount) + 0.5) * 90/angleCount
  if (direction === EAST) return angle
  if (direction === SOUTH) return angle + 90
  if (direction === WEST) return angle + 180
  if (direction === NORTH) return angle - 90
}
