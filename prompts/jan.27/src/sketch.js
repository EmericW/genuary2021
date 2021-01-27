import { makeNoise3D } from 'open-simplex-noise';

if (module.hot) module.hot.accept(() => window.location.reload());

const noise3D = makeNoise3D(Date.now());

const CANVAS_WIDTH = window.innerWidth;
const CANVAS_HEIGHT = window.innerHeight;
const HALF_CANVAS_WIDTH = CANVAS_WIDTH / 2;
const HALF_CANVAS_HEIGHT = CANVAS_HEIGHT / 2;
const GRID_WIDTH = 600;
const GRID_HEIGHT = 600;
const HALF_GRID_WIDTH = GRID_WIDTH / 2;
const HALF_GRID_HEIGHT = GRID_HEIGHT / 2;
const SCALE = 5;
const COLS = GRID_WIDTH / SCALE;
const ROWS = GRID_HEIGHT / SCALE;
const POSITIONAL_NOISE_RESOLUTION = 0.02;
const TIME_NOISE_RESOLUTION = 0.04;

export function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
}

export function draw() {
  background(0);
  noStroke();

  translate(
    HALF_CANVAS_WIDTH - HALF_GRID_WIDTH,
    HALF_CANVAS_HEIGHT - HALF_GRID_HEIGHT,
  );

  for (let xOffset = 0; xOffset < COLS; xOffset += 1) {
    for (let yOffset = 0; yOffset < ROWS; yOffset += 1) {
      const noiseValue = noise3D(
        xOffset * POSITIONAL_NOISE_RESOLUTION,
        yOffset * POSITIONAL_NOISE_RESOLUTION,
        frameCount * TIME_NOISE_RESOLUTION,
      );
      const saturation = Math.floor(map(noiseValue, -1, 1, 74, 100));
      const lightness = Math.floor(map(noiseValue, -1, 1, 20, 80));
      const fillColor = color(`hsl(35, ${saturation}%, ${lightness}%)`);
      fill(fillColor);
      rect(xOffset * SCALE, yOffset * SCALE, SCALE, SCALE);
    }
  }
}
