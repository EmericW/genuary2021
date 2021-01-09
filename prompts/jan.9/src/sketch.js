/* eslint-disable no-underscore-dangle */
import Source from './source';

if (module.hot) module.hot.accept(() => window.location.reload());

const FRAME_RATE = 40;
const MARGIN = 40;
const CANVAS_WIDTH = window.innerWidth - MARGIN * 2;
const CANVAS_HEIGHT = window.innerHeight - MARGIN * 2;

const SCALE = 3;
const AMOUNT_OF_SOURCES = 4;
const MAX_SOURCE_RADIUS_THRESHOLD = Math.sqrt(
  CANVAS_WIDTH ** 2 + CANVAS_HEIGHT ** 2,
);
const SOURCE_ADDITION_INTERVAL = 10000;

let sources = [];

function addSource(x, y) {
  sources = [
    ...sources,
    new Source(x || random(0, CANVAS_WIDTH), y || random(0, CANVAS_HEIGHT)),
  ];
}

export function setup() {
  pixelDensity(1);
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  frameRate(FRAME_RATE);

  for (let i = 0; i < AMOUNT_OF_SOURCES; i += 1) {
    addSource();
  }

  setTimeout(() => {
    setInterval(() => {
      addSource();
    }, SOURCE_ADDITION_INTERVAL);
  }, SOURCE_ADDITION_INTERVAL);
}

export function draw() {
  background(0);

  sources.forEach((source) => {
    source.propogate();
  });

  loadPixels();

  for (let y = 0; y <= CANVAS_HEIGHT; y += SCALE) {
    for (let x = 0; x <= CANVAS_WIDTH; x += SCALE) {
      let combinedAmplitude = 0;

      sources.forEach((source) => {
        combinedAmplitude += source.getAmplitudeForCoordinates({
          x: x + SCALE / 2,
          y: y + SCALE / 2,
        });
      });

      const opacity = map(Math.max(0, combinedAmplitude), 0, 3, 0, 255);

      for (let _y = 0; _y < SCALE; _y += 1) {
        if (y + _y > CANVAS_HEIGHT - 1) continue;

        for (let _x = 0; _x < SCALE; _x += 1) {
          if (x + _x > CANVAS_WIDTH - 1) continue;

          const index = (x + _x + (y + _y) * CANVAS_WIDTH) * 4;

          pixels[index + 0] = 255;
          pixels[index + 1] = 255;
          pixels[index + 2] = 255;
          pixels[index + 3] = opacity;
        }
      }
    }
  }
  updatePixels();

  let newSources = [];
  for (let i = 0; i < sources.length; i += 1) {
    const source = sources[i];

    if (source.radius < MAX_SOURCE_RADIUS_THRESHOLD) {
      newSources = [...newSources, source];
    }
  }
  sources = newSources;
}

export function mouseClicked() {
  addSource(mouseX, mouseY);
}
