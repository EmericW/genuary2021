if (module.hot) module.hot.accept(() => window.location.reload());

const MARGIN = 40;
const CANVAS_WIDTH = window.innerWidth;
const CANVAS_HEIGHT = window.innerHeight - MARGIN * 2;

const TRIANGLE_SIDE_LENGTH = 50;
const TRIANGLE_ALTITUDE = 0.5 * Math.sqrt(3) * TRIANGLE_SIDE_LENGTH;
const HALF_TRIANGLE_SIDE_LENGTH = Math.floor(TRIANGLE_SIDE_LENGTH / 2);

const VERTEX_DIRECTION_TOP = 'top';
const VERTEX_DIRECTION_BOTTOM = 'bottom';
const VERTEX_DIRECTION_LEFT_TOP = 'left-top';
const VERTEX_DIRECTION_LEFT_BOTTOM = 'left-bottom';
const VERTEX_DIRECTION_RIGHT_TOP = 'right-top';
const VERTEX_DIRECTION_RIGHT_BOTTOM = 'right-bottom';

const DIFFERENTIAL_VERTEX_DIRECTIONS = [
  VERTEX_DIRECTION_TOP,
  VERTEX_DIRECTION_BOTTOM,
];

const ROWS = 80;
const COLUMNS = 80;
const VALUES = [];

function calculateValueIndex(xOffset, yOffset) {
  return xOffset + yOffset * ROWS;
}

function drawVertex(xOffset, yOffset) {
  const neighbours = [
    {
      xOffset: xOffset - 1,
      yOffset,
      position: VERTEX_DIRECTION_LEFT_TOP,
    },
    {
      xOffset: xOffset - 1,
      yOffset: yOffset + 1,
      position: VERTEX_DIRECTION_LEFT_BOTTOM,
    },
    {
      xOffset: xOffset + 1,
      yOffset,
      position: VERTEX_DIRECTION_RIGHT_BOTTOM,
    },
    {
      xOffset: xOffset + 1,
      yOffset: yOffset - 1,
      position: VERTEX_DIRECTION_RIGHT_TOP,
    },
    {
      xOffset,
      yOffset: yOffset + 1,
      position: VERTEX_DIRECTION_BOTTOM,
    },
    {
      xOffset,
      yOffset: yOffset - 1,
      position: VERTEX_DIRECTION_TOP,
    },
  ];

  const valueIndex = calculateValueIndex(xOffset, yOffset);
  const value = VALUES[valueIndex];

  neighbours
    .map((neighbour) => {
      const neighbourValueIndex = calculateValueIndex(
        neighbour.xOffset,
        neighbour.yOffset,
      );
      const neighbourValue = VALUES[neighbourValueIndex];

      return {
        ...neighbour,
        value: neighbourValue,
      };
    })
    .forEach((neighbour, index, all) => {
      const { position, value: neighbourValue } = neighbour;

      const hasDifferentValue = value !== neighbourValue;
      const isDifferentialNeighbour = DIFFERENTIAL_VERTEX_DIRECTIONS.includes(
        position,
      );

      let shouldDraw =
        (hasDifferentValue && isDifferentialNeighbour) ||
        (!hasDifferentValue && !isDifferentialNeighbour);

      if (
        position === VERTEX_DIRECTION_RIGHT_TOP &&
        neighbourValue === value - 1
      ) {
        shouldDraw = true;
      }

      if (position === VERTEX_DIRECTION_TOP) {
        const { value: rightTopNeighbourValue } = all.find(
          ({ position: p }) => p === VERTEX_DIRECTION_RIGHT_TOP,
        );

        if (value === neighbourValue && rightTopNeighbourValue < value) {
          shouldDraw = true;
        }
      }

      if (position === VERTEX_DIRECTION_LEFT_TOP) {
        const { value: topNeighbourValue } = all.find(
          ({ position: p }) => p === VERTEX_DIRECTION_TOP,
        );

        if (value < neighbourValue && topNeighbourValue === value) {
          shouldDraw = true;
        }
      }

      if (shouldDraw) {
        line(
          xOffset * TRIANGLE_ALTITUDE,
          yOffset * TRIANGLE_SIDE_LENGTH + xOffset * HALF_TRIANGLE_SIDE_LENGTH,
          neighbour.xOffset * TRIANGLE_ALTITUDE,
          neighbour.yOffset * TRIANGLE_SIDE_LENGTH +
            neighbour.xOffset * HALF_TRIANGLE_SIDE_LENGTH,
        );
      }
    });
}

export function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  const cutoffValue = Math.floor(random(150, 200));

  for (let yOffset = 0; yOffset < ROWS; yOffset += 1) {
    for (let xOffset = 0; xOffset < COLUMNS; xOffset += 1) {
      const depthIndicator = xOffset * yOffset;
      const valueIndex = calculateValueIndex(xOffset, yOffset);

      VALUES[valueIndex] = 100 - Math.floor(depthIndicator / cutoffValue);
    }
  }
}

export function draw() {
  translate(-500, -CANVAS_HEIGHT - 400);
  stroke(255);
  fill(255);
  textSize(15);

  for (let yOffset = 0; yOffset < ROWS; yOffset += 1) {
    for (let xOffset = 0; xOffset < COLUMNS; xOffset += 1) {
      drawVertex(xOffset, yOffset);
    }
  }

  noLoop();
}
