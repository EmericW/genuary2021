if (module.hot) module.hot.accept(() => window.location.reload());

const MARGIN = 40;
const CANVAS_WIDTH = window.innerWidth - MARGIN * 2;
const CANVAS_HEIGHT = window.innerHeight - MARGIN * 2;

const SCALE = 30;
const HALF_SCALE = Math.floor(SCALE / 2);
const CIRCLE_SIZE = 30;
const ROWS = Math.floor(CANVAS_HEIGHT / SCALE);
const COLUMNS = Math.floor(CANVAS_WIDTH / SCALE);
const MAX_INDEX = ROWS * COLUMNS - 1;
const ITERATION_LIMIT = Math.floor((3 * MAX_INDEX) / 4);
let index = 0;
let iterationIndex = 0;

function DRAW(value) {
  if (value < 0.1) return;

  const rowIndex = Math.floor(value % ROWS);
  const columnIndex = Math.floor(value / ROWS);
  const y = rowIndex * SCALE + HALF_SCALE;
  const x = columnIndex * SCALE + HALF_SCALE;

  point(x, y);
}

function f(x) {
  DRAW(x);
  f((1 * x) / 4);
  f((2 * x) / 4);
  f((3 * x) / 4);
}

export function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  strokeWeight(CIRCLE_SIZE);
  stroke(255);
}

export function draw() {
  if (frameCount === 1) {
    background(0);
  }

  if (index >= ITERATION_LIMIT) {
    index = 0;
    iterationIndex += 1;

    const isOddIteration = iterationIndex % 2 === 1;
    if (isOddIteration) {
      stroke(0);
    } else {
      stroke(255);
    }
  }

  try {
    f(MAX_INDEX - index);
  } catch (exception) {}

  index += 1;
}
