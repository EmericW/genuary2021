import Satellite from './satellite';

if (module.hot) module.hot.accept(() => window.location.reload());

// const MARGIN = 40;
const CANVAS_WIDTH = window.innerWidth;
const CANVAS_HEIGHT = window.innerHeight;
const HALF_CANVAS_WIDTH = window.innerWidth / 2;
const HALF_CANVAS_HEIGHT = window.innerHeight / 2;
const CELL_SIZE = 250;
const HALF_CELL_SIZE = CELL_SIZE / 2;
const ROWS = 3;
const COLUMNS = 6;
const GRID_WIDTH = COLUMNS * CELL_SIZE;
const GRID_HEIGHT = ROWS * CELL_SIZE;
const HALF_GRID_WIDTH = GRID_WIDTH / 2;
const HALF_GRID_HEIGHT = GRID_HEIGHT / 2;

export function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);

  noFill();
  stroke(255);
}

export function draw() {
  translate(
    HALF_CANVAS_WIDTH - HALF_GRID_WIDTH + HALF_CELL_SIZE,
    HALF_CANVAS_HEIGHT - HALF_GRID_HEIGHT + HALF_CELL_SIZE,
  );

  for (let yOffset = 0; yOffset < ROWS; yOffset += 1) {
    const isLastRow = yOffset === ROWS - 1;

    for (let xOffset = 0; xOffset < COLUMNS; xOffset += 1) {
      const isLastColumn = xOffset === COLUMNS - 1;

      const satellite = new Satellite({
        x: 0,
        y: 0,
      });

      rotate(radians(20));
      satellite.draw();
      rotate(radians(-20));

      if (!isLastColumn && !isLastRow) {
        stroke(150);
        line(
          HALF_CELL_SIZE,
          HALF_CELL_SIZE - 10,
          HALF_CELL_SIZE,
          HALF_CELL_SIZE + 10,
        );
        line(
          HALF_CELL_SIZE - 10,
          HALF_CELL_SIZE,
          HALF_CELL_SIZE + 10,
          HALF_CELL_SIZE,
        );
        stroke(255);
      }

      translate(CELL_SIZE, 0);
    }

    translate(-GRID_WIDTH, CELL_SIZE);
  }

  noLoop();
}
