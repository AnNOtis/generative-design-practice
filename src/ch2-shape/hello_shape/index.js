/* eslint-disable no-undef, no-unused-vars */

function setup() {
  const cns = createCanvas(300, 300)
  cns.parent('container')
  frameRate(12)
}

function draw() {
  background(360)
  translate(width/2, height/2)
  const mx = constrain(mouseX, 0, width)
  const my = constrain(mouseY, 0, height)

  const circleResolution = parseInt(map(my, 0, width, 2, 80))
  const angle = TWO_PI/circleResolution
  const radius = mx/2 + 0.5

  strokeWeight(my/30)

  beginShape()
  for (var i = 0; i < circleResolution; i++) {
    const x = cos(angle*i) * radius
    const y = sin(angle*i) * radius
    line(0,0,x,y)
  }
  endShape()
}
