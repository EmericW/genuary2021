if (module.hot) module.hot.accept(() => window.location.reload());

const MARGIN = 40;
const CANVAS_WIDTH = window.innerWidth;
const CANVAS_HEIGHT = window.innerHeight - MARGIN * 2;
const HALF_CANVAS_HEIGHT = Math.floor(CANVAS_HEIGHT / 2);
const HALF_CANVAS_WIDTH = Math.floor(CANVAS_WIDTH / 2);

const NOISE_RESOLUTION = 0.015;
const MIN_CENTER_OFFSET = 150;
const MAX_CENTER_OFFSET = HALF_CANVAS_HEIGHT - 50;
const STROKE_OPACITY = 40;
const DRAW_TIMEOUT = 50;

function drawCurve(timestep, color) {
  stroke(color);

  const angleNoiseValue = noise(timestep * NOISE_RESOLUTION);
  const offsetNoiseValue = noise(timestep * NOISE_RESOLUTION);
  const angle = map(angleNoiseValue, 0, 1, PI, TWO_PI);
  const offset = map(
    offsetNoiseValue,
    0,
    1,
    MIN_CENTER_OFFSET,
    MAX_CENTER_OFFSET,
  );
  const mirroredAngle = PI + angle;

  beginShape();

  curveVertex(0, 0);
  curveVertex(0, 0);

  curveVertex(
    HALF_CANVAS_WIDTH + offset * Math.sin(angle),
    offset * Math.cos(angle),
  );

  curveVertex(
    HALF_CANVAS_WIDTH + offset * Math.sin(mirroredAngle),
    offset * Math.cos(mirroredAngle),
  );

  curveVertex(CANVAS_WIDTH, 0);
  curveVertex(CANVAS_WIDTH, 0);

  endShape();

  setTimeout(() => drawCurve(timestep + 1, color), DRAW_TIMEOUT);
}

export function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  strokeWeight(2);
  noFill();
}

export function draw() {
  translate(0, HALF_CANVAS_HEIGHT);
  drawCurve(0, color(255, 255, 255, STROKE_OPACITY));
  drawCurve(10000, color(0, 0, 0, STROKE_OPACITY));
  noLoop();
}
