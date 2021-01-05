const IMAGE = require('./images/sketch.jpg');

if (module.hot) module.hot.accept(() => window.location.reload());

const MARGIN = 40;
const CANVAS_WIDTH = window.innerWidth;
const CANVAS_HEIGHT = window.innerHeight - MARGIN * 2;
let img;

export function preload() {
  img = loadImage(IMAGE);
}

export function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  img.resize(0, CANVAS_HEIGHT);
  image(img, CANVAS_WIDTH / 2 - img.width / 2, 0);
}

export function draw() {}
