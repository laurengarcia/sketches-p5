p5.disableFriendlyErrors = true;

var obj1

function preload() {
  obj1 = loadModel("./../../assets/obj/cat/cat.obj")
}

function setup() {
  createCanvas(3000, 834, WEBGL);
  background(500);
}

function draw() {
  background(500)
  orbitControl()
  translate(0,0,600);
  normalMaterial()
  debugMode()
  noStroke()

  push()
    rotateX(PI)
    scale(0.5)
    rotateY(frameCount/100)
    model(obj1)
  pop()
  push()
    stroke(0)
    scale(0.5)
    rotateY(-frameCount/100)
    emissiveMaterial(100, 100, 100, 100)
    model(obj1)
  pop()
}

// Take snapshot, download for user
function keyPressed(){
  save("img_" + month() + '-' + day() + '_' + hour() + '-' + minute() + '-' + second() + ".jpg");
}
