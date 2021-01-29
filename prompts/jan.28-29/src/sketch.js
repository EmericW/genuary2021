import p5 from 'p5';

import Particle from './particle';
import Source from './source';

if (module.hot) module.hot.accept(() => window.location.reload());

const MARGIN = 40;
const CANVAS_WIDTH = Math.min(1300, window.innerWidth - MARGIN * 2);
const CANVAS_HEIGHT = window.innerHeight - MARGIN * 2;
const SCALE = 15;
const HALF_SCALE = SCALE / 2;
const PARTICLE_SIZE = 4;
const COLS = CANVAS_WIDTH / SCALE;
const ROWS = CANVAS_HEIGHT / SCALE;
const MAX_NUMBER_OF_SOURCES = 5;
const SOURCE_ADDITION_INTERVAL = 10000;
let particles = [];
let sources = [];

function addSource(x, y) {
  sources = [
    ...sources,
    new Source({
      x: x || random(0, CANVAS_WIDTH),
      y: y || random(0, CANVAS_HEIGHT),
    }),
  ].slice(-MAX_NUMBER_OF_SOURCES);
}

export function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);

  addSource();

  for (let xOffset = 0; xOffset <= COLS; xOffset += 1) {
    for (let yOffset = 0; yOffset <= ROWS; yOffset += 1) {
      particles = [
        ...particles,
        new Particle({
          x: xOffset * SCALE + HALF_SCALE,
          y: yOffset * SCALE + HALF_SCALE,
          size: PARTICLE_SIZE,
        }),
      ];
    }
  }

  setTimeout(() => {
    setInterval(() => {
      addSource();
    }, SOURCE_ADDITION_INTERVAL);
  }, SOURCE_ADDITION_INTERVAL);
}

export function draw() {
  background(0);

  noStroke();
  fill(255);

  particles.forEach((particle) => {
    const result = new p5.Vector();

    sources.forEach((source) => {
      const distanceFromCenter = source.getDistanceFromCenter(
        particle.getCoordinates(),
      );
      const amplitude = source.getAmplitudeForCoordinates(distanceFromCenter);
      const angle = source.getForceAngleForCoordinates(
        particle.getCoordinates(),
      );
      const vector = p5.Vector.fromAngle(angle);
      vector.setMag(amplitude * 2);

      result.add(vector);
    });

    particle.applyForce(result);
    particle.draw();
  });

  sources.forEach((source) => {
    source.propogate();
  });
}

export function mouseClicked() {
  addSource(mouseX, mouseY);
}
