if (module.hot) module.hot.accept(() => window.location.reload());

const MARGIN = 40;
const CANVAS_WIDTH = window.innerWidth;
const CANVAS_HEIGHT = window.innerHeight - MARGIN * 2;

export function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
}

export function draw() {}
