if (module.hot) module.hot.accept(() => window.location.reload());

const MARGIN = 40;
const CANVAS_WIDTH = window.innerWidth;
const CANVAS_HEIGHT = window.innerHeight - MARGIN * 2;
const HALF_CANVAS_WIDTH = CANVAS_WIDTH / 2;
const HALF_CANVAS_HEIGHT = CANVAS_HEIGHT / 2;

const NUMBER_OF_LINES = 80;
const LINE_MARGIN = 12;
const NUMBER_OF_LINE_SEGMENTS = 60;
const CAPTURE_WIDTH = NUMBER_OF_LINES * LINE_MARGIN;
const CAPTURE_HEIGHT = NUMBER_OF_LINE_SEGMENTS * LINE_MARGIN;
const HALF_CAPTURE_WIDTH = CAPTURE_WIDTH / 2;
const HALF_CAPTURE_HEIGHT = CAPTURE_HEIGHT / 2;
const MAX_ANGLE = 1.5708;

let capture;

export function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);

  capture = createCapture(VIDEO);
  capture.size(CAPTURE_WIDTH, CAPTURE_HEIGHT);
  capture.hide();

  stroke(255);
  noFill();
}

export function draw() {
  background(0);
  translate(
    HALF_CANVAS_WIDTH - HALF_CAPTURE_WIDTH,
    HALF_CANVAS_HEIGHT - HALF_CAPTURE_HEIGHT,
  );

  rect(0, 0, CAPTURE_WIDTH, CAPTURE_HEIGHT);

  capture.loadPixels();
  for (let xOffset = 0; xOffset < NUMBER_OF_LINES; xOffset += 1) {
    for (let yOffset = 0; yOffset < NUMBER_OF_LINE_SEGMENTS; yOffset += 1) {
      let grayscaleValues = [];

      for (let imgX = 0; imgX < LINE_MARGIN; imgX += 5) {
        for (let imgY = 0; imgY < LINE_MARGIN; imgY += 5) {
          const index =
            (yOffset * LINE_MARGIN + imgY) * (capture.width * 4) +
            (xOffset * LINE_MARGIN + imgX) * 4;
          const pixelValues = capture.pixels.slice(index, index + 4);

          grayscaleValues = [
            ...grayscaleValues,
            (pixelValues[0] + pixelValues[1] + pixelValues[2]) / 3,
          ];
        }
      }

      const areaColor =
        grayscaleValues.reduce((sum, value) => sum + value, 0) /
        grayscaleValues.length;

      const angle = (areaColor / 255) * MAX_ANGLE;

      const x = LINE_MARGIN * Math.sin(angle);
      const y = LINE_MARGIN * Math.cos(angle);
      line(
        xOffset * LINE_MARGIN,
        yOffset * LINE_MARGIN,
        xOffset * LINE_MARGIN + x,
        yOffset * LINE_MARGIN + y,
      );
    }
  }
}
