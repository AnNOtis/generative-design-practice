const colorSetCount = 99
const hueColors = new Array(colorSetCount)
const santurationColors = new Array(colorSetCount)
const brigthnessColors = new Array(colorSetCount)

function setup() {
  const cvs = createCanvas(windowWidth > 800 ? 800 : windowWidth, 120)
  cvs.parent('container')
  background(360)
  colorMode(HSB, 360, 100, 100)
  noStroke()
  frameRate(12)
  changeColorMode(6) // mode: black & white
}

function draw() {
  const tileCountX = Math.round(map(mouseX, 0, width, 4, colorSetCount - 1))
  const tileCountY = 3

  const tileWidth = width / tileCountX
  const tileHeight = height / tileCountY

  let counter = 0
  for(let row=0; row<tileCountY; row+=1) {
    for(let column=0; column<colorSetCount; column+=1) {
      const colorIndex = counter % tileCountX
      fill(
        hueColors[colorIndex],
        santurationColors[colorIndex],
        brigthnessColors[colorIndex]
      )

      rect(column * tileWidth, row * tileHeight, tileWidth, tileHeight)
      counter+=1
    }
  }
}

function keyReleased() {
  changeColorMode(key)
}

function changeColorMode(mode) {
  switch(Number(mode)) {
    case 1:
      // all
      generateColors(
        () => random(0, 360),
        () => random(0, 100),
        () => random(0, 100)
      )
      break;
    case 2:
      // full brigthness
      generateColors(
        () => random(0, 360),
        () => random(0, 100),
        () => 100
      )
      break;
    case 3:
      // full santuration
      generateColors(
        () => random(0, 360),
        () => 100,
        () => random(0, 100)
      )
      break;
    case 4:
      // warmer
      generateColors(
        () => random(0, 60),
        () => random(60, 100),
        () => 100
      )
      break;
    case 5:
      // colder
      generateColors(
        () => random(150, 260),
        () => random(0, 100),
        () => random(60, 100)
      )
      break;
    case 6:
      // black and white
      generateColors(
        () => 0,
        () => 0,
        () => random(0, 100)
      )
      break;
    case 7:
      // mix two rules
      generateColors(
        (i) => i % 2 ? random(0, 100) - 40 : 240,
        () => random(0, 100),
        () => 100
      )
      break;
  }
}

function generateColors(hue, sat, br) {
  for (let i = 0; i < colorSetCount; i++) {
    hueColors[i] = hue(i)
    santurationColors[i] = sat(i)
    brigthnessColors[i] = br(i)
  }
}
