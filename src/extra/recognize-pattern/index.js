const tile = 10
const palettes =  ['#AAFF00', '#FFAA00', '#FF00AA', '#AA00FF', '#00AAFF']
const colorNames = ['綠色', '橘色', '粉紅色', '紫色', '藍色']
const patternColumnCount = 3
let colors = new Array(tile).fill(new Array(tile))
const dice = new Array(tile).fill(null).map((_, index) => index)

function setup() {
  const cns = createCanvas(500, 600)
  cns.parent('container')
  rectMode(CENTER)
  noStroke()
  noLoop()
  strokeJoin(ROUND)
}

function draw() {
  background('white')
  const size = width / tile
  translate(size/2, size/2)

  const chooseRow = random(dice)
  const chooseColumns = shuffle(dice).slice(0, patternColumnCount)

  for (let y = 0; y < tile; y++) {
    for (let x = 0; x < tile; x++) {
      const color = random(palettes)
      colors[y][x] = color
      fill(color)
      rect(x * size, y * size, size * 0.8, size * 0.8)

      if (y === chooseRow) {
        push()
        translate(0, height - size)

        const shouldFill = chooseColumns.includes(x)
        if (!shouldFill) {
          stroke('#999999')
          fill('#FFFFFF')
        } else {
          noStroke()
        }
        rect(x * size, 0, size * 0.8 - 1, size * 0.8 - 1)
        pop()
      }
    }

    if (y === chooseRow) {
      const question = chooseColumns
        .sort()
        .reduce((message, column, index) =>
          message + `第 ${column} 格是"${colorNames[palettes.indexOf(colors[y][column])]}"${index === (chooseColumns.length - 1) ? '?' : ', '}`
        , '問題： 哪一行的')

      push()
      fill('#555')
      textSize(12)
      text(question, 0, height - size * 2)
      pop()
    }
  }
}

function mouseReleased() {
  redraw()
}
