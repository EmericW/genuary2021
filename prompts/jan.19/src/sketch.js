if (module.hot) module.hot.accept(() => window.location.reload());

const MARGIN = 80;
const CANVAS_HEIGHT = window.innerHeight - MARGIN * 2;
const CANVAS_WIDTH = CANVAS_HEIGHT;

const NUMBER_OF_LINES = 40;
const LINE_MARGIN = 10;
const LINE_AMPLITUDE = 20;
const MAX_NOISE_AMPLITUDE_OFFSET = 40;
const MAX_NOISE_FASE_OFFSET = 40;

export function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
}

export function draw() {
  background(0);
  noFill();
  stroke(255);

  strokeWeight(10);
  square(0, 0, CANVAS_WIDTH);

  strokeWeight(2);
  for (let lineIndex = 0; lineIndex < NUMBER_OF_LINES; lineIndex += 1) {
    const progress = map(lineIndex, 0, NUMBER_OF_LINES, 0, 1);

    beginShape();
    for (
      let x = -MAX_NOISE_FASE_OFFSET;
      x < CANVAS_WIDTH + MAX_NOISE_FASE_OFFSET;
      x += 1
    ) {
      const noiseValue = noise(lineIndex * 3, x * 0.2, frameCount * 0.01);

      const noiseAmplitudeOffset = map(
        noiseValue,
        0,
        1,
        -MAX_NOISE_AMPLITUDE_OFFSET,
        MAX_NOISE_AMPLITUDE_OFFSET,
      );
      const noiseFaseOffset = map(noiseValue, 0, 1, 0, MAX_NOISE_FASE_OFFSET);
      const amplitudeOffset = map(progress, 0, 1, 0, noiseAmplitudeOffset);
      const faseOffset = map(progress, 0, 1, 0, noiseFaseOffset);

      const y =
        (LINE_AMPLITUDE + amplitudeOffset) *
        Math.sin((x + frameCount * 0.2) * 0.1);

      curveVertex(x + faseOffset, y);
    }
    endShape();

    translate(0, LINE_AMPLITUDE + LINE_MARGIN);
  }

  // noLoop();
}
