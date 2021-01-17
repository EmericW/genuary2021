import Interpolate from './interpolate';

if (module.hot) module.hot.accept(() => window.location.reload());

const MARGIN = 40;
const CANVAS_WIDTH = window.innerWidth;
const CANVAS_HEIGHT = window.innerHeight - MARGIN * 2;
const HALF_CANVAS_WIDTH = Math.floor(CANVAS_WIDTH / 2);
const HALF_CANVAS_HEIGHT = Math.floor(CANVAS_HEIGHT / 2);

const RANGE = 400;
let hue = 0;
let hue2 = 180;
let verticalAnchor;
let horizontalAnchor;
let verticalAnchor2;
let horizontalAnchor2;

export function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  background(0);
  frameRate(60);

  verticalAnchor = new Interpolate(-RANGE, -RANGE, RANGE);
  horizontalAnchor = new Interpolate(0, -RANGE, RANGE);
  verticalAnchor2 = new Interpolate(-RANGE, -RANGE, RANGE);
  horizontalAnchor2 = new Interpolate(0, -RANGE, RANGE);
}

export function draw() {
  translate(HALF_CANVAS_WIDTH, HALF_CANVAS_HEIGHT);
  strokeWeight(2);

  stroke(color(`hsl(${Math.floor(hue % 360)}, 40%, 50%)`));
  line(0, verticalAnchor.getValue(), horizontalAnchor.getValue(), 0);
  hue += 0.3;
  verticalAnchor.increment();
  horizontalAnchor.increment();

  rotate(radians(135));
  stroke(color(`hsl(${Math.floor(hue2 % 360)}, 40%, 50%)`));
  line(0, verticalAnchor2.getValue(), horizontalAnchor2.getValue(), 0);
  hue2 += 0.3;
  verticalAnchor2.increment();
  horizontalAnchor2.increment();
}
