function setup() {
  //set 3D Canvas
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
}

function draw() {
  background(200);

  // Box primitive
  push();
  rotateX(frameCount);
  box(150);
  pop();

  // Sphere Primitive
  push();
  translate(0, -250);
  rotateX(frameCount);
  sphere(75);
  pop();

  // Cylinder primitive
  push();
  translate(-250, 0);
  rotateX(frameCount);
  cylinder(75, 150);
  pop();

  // Torus primitive
  push();
  translate(250, -250);
  rotateX(frameCount);
  torus(65, 20);
  pop();

  // Cone primitive
  push();
  translate(250, 0);
  rotateX(frameCount);
  cone(75, 150);
  pop();

  // Plane primitive
  push();
  translate(0, 250);
  rotateX(frameCount);
  plane(150, 150);
  pop();

  // Ellipsoid primitive
  push();
  translate(-250, -250);
  rotateX(frameCount);
  ellipsoid(50, 50, 100);
  pop();
}
