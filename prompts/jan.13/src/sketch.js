import PI from './PI';

if (module.hot) module.hot.accept(() => window.location.reload());

const MARGIN = 40;
const CANVAS_WIDTH = window.innerWidth;
const CANVAS_HEIGHT = window.innerHeight - MARGIN * 2;
const WINDOW_SIZE = 30;
const POINT_SIZE = 20;
const INTERVAL = (Math.PI * 2) / POINT_SIZE;
const PI_NUMBERS = PI.split('');
const BASE_RADIUS = 380;
let STACKS = [];
let windowOffset = 0;

function generateNextStack() {
  let newEntry = [];

  for (let i = windowOffset; i < windowOffset + POINT_SIZE; i += 1) {
    const angle = (i - windowOffset) * INTERVAL;
    const offset = +PI_NUMBERS[i];

    newEntry = [
      ...newEntry,
      {
        angle,
        offset,
      },
    ];
  }

  STACKS = [newEntry, ...STACKS.slice(0, WINDOW_SIZE)];

  windowOffset += 1;
}

function drawStacks() {
  background(0);
  translate(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
  stroke(255);
  noFill();

  for (let i = 0; i < STACKS.length; i += 1) {
    const entry = STACKS[i];

    beginShape();
    for (let j = 0; j < entry.length; j += 1) {
      const { angle, offset } = entry[j];
      const maxPixelOffset = map(i, 0, entry.length - 1, 90, 0);
      const pixelOffset = map(offset, 0, 9, 0, maxPixelOffset);
      const radius =
        BASE_RADIUS - i * (BASE_RADIUS / WINDOW_SIZE) + pixelOffset;

      const x = radius * Math.sin(angle);
      const y = radius * Math.cos(angle);

      curveVertex(x, y);
    }
    endShape(CLOSE);
  }
}

export function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  pixelDensity(1);
  background(0);
  frameRate(20);
}

export function draw() {
  generateNextStack();
  drawStacks();
}
