if (module.hot) module.hot.accept(() => window.location.reload());

const GRID_SCALE = 100;
const GRID_ROWS = 8;
const GRID_COLUMNS = 16;
const GRID_WIDTH = GRID_SCALE * GRID_COLUMNS;
const GRID_HEIGHT = GRID_SCALE * GRID_ROWS;

let POLYGON_ANGLES = 6;
const POLYGON_SIZE = 40;

const ROTATION_FRAMES_COUNT = 120;
let startingOffsetAngle = 0;
let currentOffsetAngle = 0;
let angleDifference = 0;
let startingFrameCount = 0;

const polygons = [];

function drawPolygon({ points }) {
  for (let i = 0; i < points.length; i += 1) {
    const point1 = points[i];
    let point2 = points?.[i + 1];

    if (i === points.length - 1) {
      [point2] = points;
    }

    line(point1.x, point1.y, point2.x, point2.y);
  }
}

function getMirroredPolygon(sourcePolygon, mirrorDirection) {
  const newPoints = [];
  let newAngle;

  const { points, angle } = sourcePolygon;

  if (mirrorDirection === 'left') {
    newAngle = TWO_PI - angle;
  } else if (mirrorDirection === 'top') {
    newAngle = PI - angle;
  } else {
    newAngle = angle + PI;
  }

  for (let i = 0; i < points.length; i += 1) {
    const point = points[i];
    let newPointAngle = point.angle;
    // const angle = Math.min(point.angle, point.angle - columnOffset * 0.02);

    if (mirrorDirection === 'left') {
      newPointAngle = TWO_PI - point.angle;
    } else if (mirrorDirection === 'top') {
      newPointAngle = PI - point.angle;
    } else {
      newPointAngle = point.angle + PI;
    }

    const x = POLYGON_SIZE * Math.sin(newPointAngle);
    const y = POLYGON_SIZE * Math.cos(newPointAngle);

    newPoints[i] = {
      x: GRID_SCALE / 2 + x,
      y: GRID_SCALE / 2 + y,
      angle: newPointAngle,
    };
  }

  return {
    points: newPoints,
    angle: newAngle,
  };
}

function drawGrid() {
  for (let x = 0; x < GRID_COLUMNS; x += 1) {
    for (let y = 0; y < GRID_ROWS; y += 1) {
      // stroke(255, 255, 255, 100);
      // square(0, 0, GRID_SCALE);
      stroke(255, 255, 255, 255);

      const polygonIndex = x * GRID_COLUMNS + y;
      const gridPolygon = polygons[polygonIndex];
      drawPolygon(gridPolygon);

      translate(0, GRID_SCALE);
    }

    translate(GRID_SCALE, -GRID_HEIGHT);
  }
}

function generateBasePolygon(angleOffset) {
  const points = [];
  const angleInterval = TWO_PI / POLYGON_ANGLES;

  for (let i = 0; i <= POLYGON_ANGLES; i += 1) {
    const x = POLYGON_SIZE * Math.sin(angleInterval * i + angleOffset);
    const y = POLYGON_SIZE * Math.cos(angleInterval * i + angleOffset);

    points[i] = {
      x: x + GRID_SCALE / 2,
      y: y + GRID_SCALE / 2,
      angle: i * angleInterval + angleOffset,
    };
  }

  return {
    angle: 0,
    points,
  };
}

function generatePolygons(angleOffset) {
  for (let x = 0; x < GRID_COLUMNS; x += 1) {
    for (let y = 0; y < GRID_ROWS; y += 1) {
      const polygonIndex = x * GRID_COLUMNS + y;
      let polygon;

      if (x === 0 && y === 0) {
        // root
        polygon = generateBasePolygon(angleOffset);
      } else if (y === 0 && x > 0) {
        // top row, reflection from left cell
        const sourceIndex = (x - 1) * GRID_COLUMNS + y;
        const sourcePolygon = polygons[sourceIndex];
        polygon = getMirroredPolygon(sourcePolygon, 'left');
      } else if (x === 0 && y > 0) {
        // left column, reflection from top cell
        const sourceIndex = x * GRID_COLUMNS + y - 1;
        const sourcePolygon = polygons[sourceIndex];
        polygon = getMirroredPolygon(sourcePolygon, 'top');
      } else {
        // intermediate cell, reflection from top-left cell
        const sourceIndex = (x - 1) * GRID_COLUMNS + y - 1;
        const sourcePolygon = polygons[sourceIndex];
        polygon = getMirroredPolygon(sourcePolygon, 'top-left');
      }

      polygons[polygonIndex] = polygon;
    }
  }
}

function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

function incrementOffsetAngle() {
  if (frameCount > startingFrameCount + ROTATION_FRAMES_COUNT) return;

  const progress = map(
    frameCount,
    startingFrameCount,
    startingFrameCount + ROTATION_FRAMES_COUNT,
    0,
    1,
  );
  const easedIncrement = easeInOutQuad(progress);
  const increment = map(easedIncrement, 0, 1, 0, angleDifference);

  currentOffsetAngle = startingOffsetAngle + increment;
}

function triggerAnimation() {
  startingFrameCount = frameCount;
  startingOffsetAngle = currentOffsetAngle;
  angleDifference = map(Math.random(), 0, 1, -TWO_PI, TWO_PI);
}

export function setup() {
  POLYGON_ANGLES = random([4, 5, 6, 7]);
  createCanvas(GRID_WIDTH, GRID_HEIGHT);

  generatePolygons();

  setTimeout(() => {
    triggerAnimation();
  }, 500);
}

export function draw() {
  background(0);
  noFill();

  incrementOffsetAngle();
  generatePolygons(currentOffsetAngle);
  drawGrid();

  if (frameCount % (ROTATION_FRAMES_COUNT * 2) === 0) {
    triggerAnimation();
  }
}
