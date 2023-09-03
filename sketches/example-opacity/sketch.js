console.log('start');

function setup() {
  createCanvas(300, 300);

  ellipse(width/2, height/2, 100, 100);
  ellipse(width/4, height/2, 50, 50);

  fill(0,0,255);
  rect(0,0,20,100);

  // 255 means 100% opacity.
  fill(255,0,0,255);
  rect(18,0,100,20);

  // 75% opacity.
  fill(255,0,0,191);
  rect(18,25,100,20);

  // 55% opacity.
  fill(255,0,0,127);
  rect(18,50,100,20);

  // 25% opacity.
  fill(255,0,0,63);
  rect(18,75,100,20);

  // inherits opacity from above
  ellipse(width-100, height-100, 100, 100);
  ellipse(width-50, height-50, 50, 50);
}

function draw() {
  // background(220, 180, 200);
}
