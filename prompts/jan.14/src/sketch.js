if (module.hot) module.hot.accept(() => window.location.reload());

const CANVAS_WIDTH = window.innerWidth;
const CANVAS_HEIGHT = window.innerHeight;
const CENTER_WIDTH = Math.floor(CANVAS_WIDTH / 2);
const CENTER_HEIGHT = Math.floor(CANVAS_HEIGHT / 2);

const TRIANGLE_SIDE_LENGTH = 50;
const TRIANGLE_ALTITUDE = 0.5 * Math.sqrt(3) * TRIANGLE_SIDE_LENGTH;
const HALF_TRIANGLE_SIDE = Math.floor(TRIANGLE_SIDE_LENGTH / 2);

const REQUESTED_GRID_HEIGHT = 800;
const REQUESTED_GRID_WIDTH = 800;
const GRID_HEIGHT =
  Math.ceil(REQUESTED_GRID_HEIGHT / TRIANGLE_SIDE_LENGTH) *
  TRIANGLE_SIDE_LENGTH;
const HALF_GRID_HEIGHT = Math.floor(GRID_HEIGHT / 2);
const GRID_WIDTH =
  Math.ceil(REQUESTED_GRID_WIDTH / TRIANGLE_ALTITUDE) * TRIANGLE_SIDE_LENGTH;
const HALF_GRID_WIDTH = Math.floor(GRID_WIDTH / 2);
const ROWS = Math.floor(GRID_HEIGHT / HALF_TRIANGLE_SIDE);
const COLUMNS = Math.floor(GRID_WIDTH / TRIANGLE_ALTITUDE);

function drawEastTriangle(x = 0, y = 0) {
  if (Math.random() > 0.5) {
    line(0 + x, 0 + y, 0 + x, TRIANGLE_SIDE_LENGTH + y);
  }
  if (Math.random() > 0.5) {
    line(
      0 + x,
      TRIANGLE_SIDE_LENGTH + y,
      TRIANGLE_ALTITUDE + x,
      HALF_TRIANGLE_SIDE + y,
    );
  }
  if (Math.random() > 0.5) {
    line(TRIANGLE_ALTITUDE + x, HALF_TRIANGLE_SIDE + y, 0 + x, 0 + y);
  }
}

function drawWestTriangle(x = 0, y = 0) {
  if (Math.random() > 0.5) {
    line(
      0 + x,
      HALF_TRIANGLE_SIDE + y,
      TRIANGLE_ALTITUDE + x,
      TRIANGLE_SIDE_LENGTH + y,
    );
  }
  if (Math.random() > 0.5) {
    line(
      TRIANGLE_ALTITUDE + x,
      TRIANGLE_SIDE_LENGTH + y,
      TRIANGLE_ALTITUDE + x,
      0 + y,
    );
  }
  if (Math.random() > 0.5) {
    line(TRIANGLE_ALTITUDE + x, 0 + y, 0 + x, HALF_TRIANGLE_SIDE + y);
  }
}

function drawTriangle(columnIndex, rowIndex) {
  const isOddRow = rowIndex % 2 === 1;
  const isOddColumn = columnIndex % 2 === 1;
  const y = rowIndex * HALF_TRIANGLE_SIDE;
  const x = columnIndex * TRIANGLE_ALTITUDE;

  if ((isOddColumn && !isOddRow) || (!isOddColumn && isOddRow)) {
    drawEastTriangle(x, y);
  } else {
    drawWestTriangle(x, y);
  }
}

export function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
}

export function draw() {
  translate(CENTER_WIDTH - HALF_GRID_WIDTH, CENTER_HEIGHT - HALF_GRID_HEIGHT);
  stroke(255);
  noFill();

  beginShape();
  vertex(0, 0);
  vertex(COLUMNS * TRIANGLE_ALTITUDE, 0);
  vertex(COLUMNS * TRIANGLE_ALTITUDE, ROWS * HALF_TRIANGLE_SIDE);
  vertex(0, ROWS * HALF_TRIANGLE_SIDE);
  endShape(CLOSE);

  for (let y = 0; y < ROWS; y += 1) {
    const isOddRow = y % 2 === 1;
    if (isOddRow && y === ROWS - 1) continue;

    for (let x = 0; x < COLUMNS; x += 1) {
      const isOddColumn = y % 2 === 1;
      if (isOddColumn && y === COLUMNS - 1) continue;

      drawTriangle(x, y);
    }
  }

  noLoop();
}
