let current = 0;
let target = 1;
let chars = [];
let prev_array = [];
let g;
let imageArray;
let rs;

function setup() {
  createCanvas(800, 800);
  pixelDensity(1);
  angleMode(DEGREES);

  let palette = [];
  for (let i = 0; i < 16; i++) {
    palette[i] = color((i / 16) * 255);
  }

  imageArray = createImageArray(int(width / 4), 10, palette);
  rs = int(random(10000));
  g = createGraphics(width, height);
  g.angleMode(DEGREES);
}

function createCharArray(f, num) {
  let array = [];
  for (let i = 0; i < num; i++) {
    let str = String.fromCodePoint(f + i);
    // String.fromCodePoint(0x12000 + int(random(618)));
    array.push(str);
  }
  array.push("　");
  let g = createGraphics(10, 10);
  g.textSize(g.width);
  g.textAlign(CENTER, CENTER);
  for (let i = 0; i < array.length; i++) {
    let str = array[i];
    g.clear();
    g.fill(255);
    g.text(str, g.width / 2, g.height / 2);
    g.loadPixels();
    let num = 0;
    for (let j = 0; j < g.pixels.length; j += 4) {
      let c = g.pixels[j];
      if (c > 0) num++;
    }
    array[i] = {
      str: str,
      num: num,
    };
  }
  g.remove();
  array.sort(function (a, b) {
    return a.num - b.num;
  });
  return array;
}

function draw() {
  background(220);
  randomSeed(rs);
  g.clear();
  chars = createCharArray((rs+frameCount*3)%200000, 50);

  let deltaTime = 1 / 60;
  let k = 8;
  current = lerp(target, current, exp(-k * deltaTime));

  let offset = g.width / 20;
  let x = offset;
  let y = offset;
  let d = width - offset * 2;
  let minD = d / 2;
  separateGrid(x, y, d, minD, g);

  if (current > 0.9999) {
    current = 0;
    rs = int(random(10000));
  }

  g.loadPixels();
  let block_size = int(width / 40);
  let block_num = int(height / block_size) * int(width / block_size);
  textSize(block_size*1.1);
  textAlign(CENTER, CENTER);
  fill(0, 0, 0);
  noStroke();
  let t = 0;
  for (let j = 0; j < height; j += block_size) {
    for (let i = 0; i < width; i += block_size) {
      let index =
        (int(j + block_size / 2) * g.width + int(i + block_size / 2)) * 4;
      let pr = g.pixels[index];
      let pg = g.pixels[index + 1];
      let pb = g.pixels[index + 2];
      let n = (pr + pg + pb) / 3;
      n = int(map(n / 255, 0, 1, 0, chars.length - 1));
      if (prev_array.length == block_num) {
        n = int((prev_array[t] + n) / 2);
      }
      push();
      translate(i + block_size / 2, j + block_size / 2);
      // rotate(int(pr+pg+pb/(255*3))*360/4);
      text(chars[n].str, 0, 0);
      pop();
      prev_array[t++] = n;
    }
  }
}

function createImageArray(w, num, arr) {
  let imageArray = [];
  let g = createGraphics(w, w);
  g.drawingContext.shadowColor = color(0, 0, 0, 33);
  g.drawingContext.shadowBlur = w / 4;
  let palette = shuffle(arr.concat());
  for (let i = 0; i < num; i++) {
    let img = createImage(w, w);
    let colors = shuffle(palette);
    // g.background(colors[i % colors.length]);
    g.clear();
    g.push();
    g.translate(g.width / 2, g.height / 2);
    g.rotate((int(random(4)) * PI) / 2);
    g.translate(-g.width / 2, -g.height / 2);
    let n = 0;
    let sclStep = int(random(1, 5));
    for (let scl = 1; scl > 0; scl -= 1 / sclStep) {
      let gradient = g.drawingContext.createConicGradient(0, 0, 0);
      gradient.addColorStop(0, colors[(i + n++) % colors.length]);
      gradient.addColorStop(1 / 4, colors[(i + n++) % colors.length]);
      g.drawingContext.fillStyle = gradient;
      g.arc(0, 0, g.width * 2 * scl, g.height * 2 * scl, 0, PI / 2, PIE);
    }
    g.pop();
    img.copy(g, 0, 0, g.width, g.height, 0, 0, g.width, g.height);
    imageArray.push(img);
  }
  g.remove();
  return imageArray;
}

function separateGrid(x, y, d, minD, g) {
  let sepNum = int(random(1, 4));
  let w = d / sepNum;
  for (let i = x; i < x + d - 1; i += w) {
    for (let j = y; j < y + d - 1; j += w) {
      if (random(100) < 80 && w > minD) {
        separateGrid(i, j, w, minD, g);
      } else {
        let dx = i;
        let dy = j;
        let dw = w;
        let dh = w;

        g.push();
        g.translate(dx + dw / 2, dy + dh / 2);
        g.rotate(int(random(4)) * 90);
        // g.translate(-dw / 2, -dh / 2);
        g.rectMode(CENTER);
        g.fill(255, 0);
        g.noStroke();
        g.rect(0, 0, dw, dh);
        g.drawingContext.clip();
        g.translate(-dw / 2, -dh / 2);
        let n = int(random(imageArray.length));

        g.image(imageArray[n], dw * current, 0, dw, dh);
        g.image(
          imageArray[(n + 1) % imageArray.length],
          -dw + dw * current,
          0,
          dw,
          dh
        );
        g.pop();
      }
    }
  }
}
