const tile = 5

function setup() {
  const cns = createCanvas(500, 500)
  cns.parent('container')
  frameRate(12)
  rectMode(CENTER)
}

function draw() {
  background(360)
  const mx = constrain(mouseX, 0, width)
  const tileSize = width / tile

  const rectCount = round(mx/30) + 1
  const endSize = map(mx, 0, width, tileSize/2, 1)

  for (let i = 0; i < tile; i++) {
    for (let j = 0; j < tile; j++) {
      push()
      translate(j*tileSize + tileSize/2, i*tileSize + tileSize/2)
      for (let number = 1; number <= rectCount; number++) {
        const size = (
          map(number, 1, rectCount, tileSize, endSize) || tileSize
        ) * 0.9
        const strokeValue = map(sqrt(number), 1, sqrt(rectCount), 5, 1) || 5

        strokeWeight(strokeValue)
        rotate(PI/rectCount)
        rect(0, 0, size, size)
      }
      pop()
    }
  }
}
