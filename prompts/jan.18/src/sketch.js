if (module.hot) module.hot.accept(() => window.location.reload());

const CANVAS_WIDTH = window.innerWidth;
const CANVAS_HEIGHT = window.innerHeight;
const HALF_CANVAS_WIDTH = Math.floor(CANVAS_WIDTH / 2);
const HALF_CANVAS_HEIGHT = Math.floor(CANVAS_HEIGHT / 2);

const LINES = 20;
const MARGIN = 15;
const DIRECTION_IN = 'in';
const DIRECTION_OUT = 'out';

function drawQuadrant(direction) {
  const start = direction === DIRECTION_IN ? 1 : 0;
  const end = direction === DIRECTION_IN ? LINES + 1 : LINES;

  for (let x = start; x < end; x += 1) {
    let movementOffset = 0;

    if (direction === DIRECTION_IN) {
      movementOffset = -(frameCount % MARGIN);
    } else if (direction === DIRECTION_OUT) {
      movementOffset = frameCount % MARGIN;
    }
    const lineOffset = x * 15;

    line(
      lineOffset + movementOffset,
      lineOffset + movementOffset,
      lineOffset + movementOffset,
      -(lineOffset + movementOffset),
    );
  }
}

export function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  frameRate(20);
  stroke(255);
  strokeWeight(2);
  noFill();
}

export function draw() {
  background(0);
  translate(HALF_CANVAS_WIDTH, HALF_CANVAS_HEIGHT);

  square(-LINES * MARGIN, -LINES * MARGIN, LINES * MARGIN * 2);

  drawQuadrant(DIRECTION_OUT);
  rotate(radians(90));
  drawQuadrant(DIRECTION_IN);
  rotate(radians(90));
  drawQuadrant(DIRECTION_OUT);
  rotate(radians(90));
  drawQuadrant(DIRECTION_IN);
}
