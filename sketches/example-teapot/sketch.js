// The origin (0, 0, 0) for WEBGL mode is in the center of the canvas,
// rather than the top left as it is in 2D mode.

let teapot;

function preload() {
  // Load model with normalise parameter set to true
  teapot = loadModel('./../../assets/obj/teapot/teapot.obj', true);
}

function setup() {
  createCanvas(600, 600, WEBGL);
  describe('Vertically rotating 3-d teapot with red, green and blue gradient.');
}

function draw() {
  background(0);
  scale(2); // Scaled to make model fit into canvas

  ambientLight(90, 90, 90);
  // shininess(1);

  let locX = mouseX - width / 2;
  let locY = mouseY - height / 2;

  pointLight(255, 255, 255, locX, locY, 50);
  pointLight(255, 255, 100, mouseX, mouseY, 50);

  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  rotateZ(millis() / 1000);
  // rotateZ(frameCount * 0.01);

  // normalMaterial(); // For effect

  model(teapot);


  if (mouseIsPressed) {
    fill(90);
  } else {
    fill(255);
  }
  ellipse(mouseX, mouseY, 80, 80);

}
