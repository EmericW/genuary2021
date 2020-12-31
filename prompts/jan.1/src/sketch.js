if (module.hot) module.hot.accept(() => window.location.reload());

const MARGIN = 40;
const CANVAS_WIDTH = window.innerWidth;
const CANVAS_HEIGHT = window.innerHeight - MARGIN * 2;
const CENTER_HEIGHT = Math.floor(CANVAS_HEIGHT / 2);
const FRAME_RATE = 50;

const WAVES = [230, 13.5, -7];
const AMPLITUDE = CANVAS_WIDTH / 20;
const RANDOM_FACTOR = 0; // increase for epilepsy
const AMOUNT_OF_WAVES = 18;
const WAVE_SEPERATION = 5;
const DRAW_INTERVAL = CANVAS_WIDTH / 20;

let timestep = 0;

export function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  stroke(255, 255, 255, 255);
  strokeWeight(2);
  frameRate(FRAME_RATE);
}

export function draw() {
  background(0);
  noFill();
  translate(0, CENTER_HEIGHT);

  timestep += 0.1;

  for (let j = 0; j <= AMOUNT_OF_WAVES; j += 1) {
    const amplitudeOffset = WAVE_SEPERATION * j;

    beginShape();

    for (let x = -200; x <= CANVAS_WIDTH + 200; x += DRAW_INTERVAL) {
      let y = 0;

      for (let i = 0; i < WAVES.length; i += 1) {
        const frequency = WAVES[i];

        // quick trick to get roughly the same result on all screen widths
        const frequencyMultiplier = frequency / CANVAS_WIDTH;

        y += AMPLITUDE * Math.sin((x + timestep) * frequencyMultiplier);
      }

      vertex(
        x + amplitudeOffset + Math.random() * RANDOM_FACTOR,
        y + amplitudeOffset + Math.random() * RANDOM_FACTOR,
      );
    }

    endShape();
  }
}
