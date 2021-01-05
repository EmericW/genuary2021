if (module.hot) module.hot.accept(() => window.location.reload());

const MARGIN = 40;
const CANVAS_WIDTH = window.innerWidth - MARGIN * 2;
const CANVAS_HEIGHT = window.innerHeight - MARGIN * 2;
const CENTER_WIDTH = Math.floor(CANVAS_WIDTH / 2);
const CENTER_HEIGHT = Math.floor(CANVAS_HEIGHT / 2);
const NOISE_RESOLUTAION = 0.1;
const NOISE_TIME_INCREMENT = 0.009;
let timestep = 0;

const MAX_SIZE = 800;
const SIZE = Math.floor(MAX_SIZE / 45);

function drawArc(size, xOffset, yOffset) {
  const start = 0;
  const value = noise(
    xOffset * NOISE_RESOLUTAION,
    yOffset * NOISE_RESOLUTAION,
    timestep,
  );
  const end = map(value, 0, 1, 0, TWO_PI);

  arc(
    size * xOffset + size / 2,
    size * yOffset + size / 2,
    size,
    size,
    start - PI * 0.5,
    end - PI * 0.5,
  );
}

function drawArcGrid() {
  const scale = MAX_SIZE / SIZE;

  for (let x = 0; x < scale; x += 1) {
    for (let y = 0; y < scale; y += 1) {
      drawArc(SIZE, x, y);
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
  translate(CENTER_WIDTH - MAX_SIZE / 2, CENTER_HEIGHT - MAX_SIZE / 2);
  timestep += NOISE_TIME_INCREMENT;
  background(0);
  drawArcGrid();
}
