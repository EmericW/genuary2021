if (module.hot) module.hot.accept(() => window.location.reload());

const MARGIN = 40;
const CANVAS_WIDTH = window.innerWidth;
const CANVAS_HEIGHT = window.innerHeight - MARGIN * 2;
const HALF_CANVAS_WIDTH = Math.floor(CANVAS_WIDTH / 2);
const HALF_CANVAS_HEIGHT = Math.floor(CANVAS_HEIGHT / 2);

const BASE_RADIUS = 180;
const EDGE_RADIUS_INTEVAL = 30;
const NOISE_RADIUS_OFFSET = 100;
const NUMBER_OF_POINTS = 100;
const ANGLE_INTERVAL = (Math.PI * 2) / NUMBER_OF_POINTS;
const COLORS = [
  '#264653',
  '#2a9d8f',
  '#e76f51',
  '#f4a261',
  '#e9c46a',
  '#ffffff',
];

export function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  noStroke();
}

export function draw() {
  background(0);
  translate(HALF_CANVAS_WIDTH, HALF_CANVAS_HEIGHT);

  for (let colorIndex = 0; colorIndex < COLORS.length; colorIndex += 1) {
    const color = COLORS[colorIndex];
    fill(color);

    beginShape();
    for (let i = 0; i < NUMBER_OF_POINTS; i += 1) {
      const angle = i * ANGLE_INTERVAL;

      const xOff = Math.sin(angle) + 1;
      const yOff = Math.cos(angle) + 1;
      const noiseValue = noise(
        xOff,
        yOff,
        (frameCount + colorIndex * 40) * 0.001,
      );

      const noiseOffset = map(
        noiseValue,
        0,
        1,
        -NOISE_RADIUS_OFFSET,
        NOISE_RADIUS_OFFSET,
      );
      const pointRadius =
        BASE_RADIUS +
        EDGE_RADIUS_INTEVAL * (COLORS.length - colorIndex) +
        noiseOffset;
      const x = pointRadius * Math.sin(angle);
      const y = pointRadius * Math.cos(angle);

      curveVertex(x, y);
    }
    endShape(CLOSE);
  }
}
