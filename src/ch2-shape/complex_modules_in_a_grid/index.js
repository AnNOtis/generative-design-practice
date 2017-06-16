const tile = 10

function setup() {
  const cns = createCanvas(500, 500)
  cns.parent('container')
  frameRate(12)
}

function draw() {
  const mx = constrain(mouseX, 0, width)
  const my = constrain(mouseY, 0, height)
  const tileSize = width / tile

  const circleCount = round(mx/30) + 1
  const endSize = map(mx, 0, width, tileSize/2, 0)
  const endOffset = map(my, 0, height, 0, (tileSize - endSize)/2)

  for (let i = 0; i < tile; i++) {
    for (let j = 0; j < tile; j++) {
      push()
      translate(j*tileSize + tileSize/2, i*tileSize + tileSize/2)

      const direction = [-HALF_PI, 0, HALF_PI, PI]
      rotate(direction[((i+j)%4)])

      for (let number = 0; number < circleCount; number++) {
        const size = map(number, 0, circleCount - 1, tileSize, endSize)
        const offset = map(number, 0, circleCount - 1, 0, endOffset)

        ellipse(offset, 0, size, size)
      }
      pop()
    }
  }
}
