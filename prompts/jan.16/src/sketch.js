if (module.hot) module.hot.accept(() => window.location.reload());

const MARGIN = 40;
const CANVAS_WIDTH = window.innerWidth;
const CANVAS_HEIGHT = window.innerHeight - MARGIN * 2;
const HALF_CANVAS_WIDTH = Math.floor(CANVAS_WIDTH / 2);
const HALF_CANVAS_HEIGHT = Math.floor(CANVAS_HEIGHT / 2);

const NUMBER_OF_CIRCLES = 120;
const MIN_RADIUS = 75;
const RADIUS_INCREMENT = 5;
const MOVEMENT_RADIUS = 30;
let timestep = 0;
let circles = [];

function incrementCircles() {
  timestep += 1;
  circles = circles.map((circle) => {
    const { radius } = circle;
    const newRadius = radius + RADIUS_INCREMENT;

    return {
      ...circle,
      radius: newRadius,
    };
  });

  const noiseValue = noise(timestep * 0.03);
  const angle = map(noiseValue, 0, 1, 0, TWO_PI);
  const x = Math.sin(angle) * MOVEMENT_RADIUS;
  const y = Math.cos(angle) * MOVEMENT_RADIUS;
  circles = [
    {
      x,
      y,
      radius: MIN_RADIUS,
    },
    ...circles,
  ];

  circles = circles.slice(0, NUMBER_OF_CIRCLES);
}

export function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  frameRate(30);

  circles.push({
    x: 0,
    y: 0,
    radius: 100,
  });
}

export function draw() {
  translate(HALF_CANVAS_WIDTH, HALF_CANVAS_HEIGHT);
  background(0);
  stroke(255);
  noFill();

  circles.forEach(({ x, y, radius }) => circle(x, y, radius));

  incrementCircles();
}
