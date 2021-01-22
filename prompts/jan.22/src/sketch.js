if (module.hot) module.hot.accept(() => window.location.reload());

const MARGIN = 40;
const CANVAS_WIDTH = window.innerWidth - MARGIN * 2;
const CANVAS_HEIGHT = window.innerHeight - MARGIN * 2;
const CENTER_WIDTH = Math.floor(CANVAS_WIDTH / 2);
const CENTER_HEIGHT = Math.floor(CANVAS_HEIGHT / 2);
const NOISE_RESOLUTAION = 0.03;
const NOISE_TIME_INCREMENT = 0.01;
let timestep = 0;

const SCALE = 20;
const COLUMNS = Math.floor(CANVAS_WIDTH / SCALE);
const ROWS = Math.floor(CANVAS_HEIGHT / SCALE);
const FLOORED_WIDTH = SCALE * COLUMNS;
const FLOORED_HEIGHT = SCALE * ROWS;

function drawArc(xOffset, yOffset) {
  const start = 0;

  const lineHeight = noise(xOffset * NOISE_RESOLUTAION, timestep);
  const arcHeight = SCALE * yOffset + SCALE / 2;
  const normalizedArcHeight = map(arcHeight, 0, FLOORED_HEIGHT, 0, 1);
  const distanceFromLine = Math.max(
    0.001,
    Math.abs(normalizedArcHeight - lineHeight),
  );

  const end = distanceFromLine * TWO_PI;

  arc(SCALE * xOffset + SCALE / 2, arcHeight, SCALE, SCALE, start, end);
}

function drawArcGrid() {
  for (let x = 0; x < COLUMNS; x += 1) {
    for (let y = 0; y < ROWS; y += 1) {
      drawArc(x, y);
    }
  }
}

export function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  stroke(255);
  noFill();
  strokeWeight(2);
}

export function draw() {
  translate(
    CENTER_WIDTH - FLOORED_WIDTH / 2,
    CENTER_HEIGHT - FLOORED_HEIGHT / 2,
  );
  timestep += NOISE_TIME_INCREMENT;
  background(0);
  drawArcGrid();
}
