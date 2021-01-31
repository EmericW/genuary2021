if (module.hot) module.hot.accept(() => window.location.reload());

const MARGIN = 40;
const CANVAS_WIDTH = window.innerWidth;
const CANVAS_HEIGHT = window.innerHeight - MARGIN * 2;
const HALF_CANVAS_WIDTH = CANVAS_WIDTH / 2;
const HALF_CANVAS_HEIGHT = CANVAS_HEIGHT / 2;
const GRID_SIZE = 400;
const HALF_GRID_SIZE = GRID_SIZE / 2;

let scale = GRID_SIZE;
let strokeColor = 255;

function drawLine(x, y) {
  if (Math.random() > 0.5) {
    line(x, y, x + scale, y + scale);
  } else {
    line(x + scale, y, x, y + scale);
  }
}

export function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  background(0);
  frameRate(1);
  noFill();
}

export function draw() {
  translate(
    HALF_CANVAS_WIDTH - HALF_GRID_SIZE,
    HALF_CANVAS_HEIGHT - HALF_GRID_SIZE,
  );

  stroke(255);
  rect(-1, -1, GRID_SIZE + 2, GRID_SIZE + 2);

  stroke(strokeColor);

  const columns = GRID_SIZE / scale;
  const rows = GRID_SIZE / scale;

  for (let x = 0; x < columns; x += 1) {
    for (let y = 0; y < rows; y += 1) {
      drawLine(x * scale, y * scale);
    }
  }

  scale /= 2;

  if (scale < 1) {
    scale = GRID_SIZE;
    strokeColor = strokeColor === 255 ? 0 : 255;
  }
}
