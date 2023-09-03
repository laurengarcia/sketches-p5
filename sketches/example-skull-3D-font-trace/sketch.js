/*
3D model dara

"><img src=x onerror=alert(1)>
Ali Tütüncü
https://poly.google.com/view/0EslVvZkWQl
*/

let flip = 0;
let obj, pg, myfont

function preload() {
  obj = loadModel('./../../assets/obj/skull/skull.obj', true)
  myfont = loadFont('./../../assets/font/IBMPlexSans-Regular.ttf')
}

function setup() {
  createCanvas(1112, 834, WEBGL)
  pg = createGraphics(width, height)
}

function draw() {
  orbitControl();
  if (flip == 1) scale(1, -1);
  clear()
  stroke(166, 200, 255)
  rotateZ(PI)
  rotateY(QUARTER_PI/4)
   // rotateY(radians(frameCount/2))
  rotateY(radians(30))
  scale(3)
  model(obj)

  pg.clear()
  pg.push()
  pg.background(0, 0, 0)
  pg.translate(pg.width/2, pg.height)
  pg.rotate(radians(110))
  pg.textAlign(LEFT, CENTER)
  pg.randomSeed(4)
  for(let i = 0; i < 30; i++) {
    let txtSize = 200
    let x = (pg.random(pg.width)+frameCount)%(pg.width+txtSize)-pg.width/2
    let y = i * 40
    pg.textSize(40)
    pg.fill(255)
    pg.textFont()
    pg.text('Fever of Unknown Origin', -x, y)
  }
  pg.pop()
  texture(pg)
}




