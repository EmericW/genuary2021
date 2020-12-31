import p5 from 'p5';

p5.disableFriendlyErrors = true;

if (module.hot) module.hot.accept(() => window.location.reload());

const MARGIN = 40;
const CANVAS_WIDTH = window.innerWidth - MARGIN * 2;
const CANVAS_HEIGHT = window.innerHeight - MARGIN * 2;

const SCALE = 12;
const HALF_SCALE = Math.floor(SCALE / 2);
const CELL_COUNT = Math.floor(CANVAS_WIDTH / SCALE);
const ROW_COUNT = Math.floor(CANVAS_HEIGHT / SCALE);
const CELLS = new Array(CELL_COUNT).fill(0).map((cell /* , index */) => {
  // if (Math.floor(CELL_COUNT) / 2 === index) {
  if (Math.random() > 0.5) {
    return 1;
  }

  return cell;
});
const STACK = [CELLS];
const RULES = [0, 1, 1, 1, 1, 0, 0, 0];
let scrollOffset = 0;

function applyRule([a, b, c]) {
  const decimalValue = a * 2 ** 2 + b * 2 ** 1 + c * 2 ** 0;
  return RULES[decimalValue];
}

function calculateNextState() {
  const [lastState] = STACK.slice(-1);
  const newStackEntry = lastState.map((current, index, baseCells) => {
    let left;
    let right;

    if (index === 0) {
      left = baseCells[baseCells.length - 1];
    } else {
      left = baseCells[index - 1];
    }

    if (index === baseCells.length - 1) {
      [right] = baseCells;
    } else {
      right = baseCells[index + 1];
    }

    return applyRule([left, current, right]);
  });

  STACK.push(newStackEntry);
}

function drawRow(cells, rowIndex = 0, rows) {
  cells.forEach((cell, columnIndex, all) => {
    if (cell === 1) {
      const cellX = columnIndex * SCALE;
      const cellY = rowIndex * SCALE - scrollOffset;

      const hasTopNeighbour = !!rows?.[rowIndex - 1]?.[columnIndex];
      const hasRightNeighbour = !!all?.[columnIndex + 1];
      const hasBottomNeighbour = !!rows?.[rowIndex + 1]?.[columnIndex];
      const hasLeftNeighbour = !!all?.[columnIndex - 1];
      const neighbourCount = [
        hasTopNeighbour,
        hasRightNeighbour,
        hasBottomNeighbour,
        hasLeftNeighbour,
      ].filter((_) => _).length;

      if (neighbourCount === 1) {
        strokeWeight(6);
        point(cellX + HALF_SCALE, cellY + HALF_SCALE);
      }

      strokeWeight(3);

      if (hasTopNeighbour) {
        line(cellX + HALF_SCALE, cellY, cellX + HALF_SCALE, cellY + HALF_SCALE);
      }

      if (hasRightNeighbour) {
        line(
          cellX + HALF_SCALE,
          cellY + HALF_SCALE,
          cellX + SCALE,
          cellY + HALF_SCALE,
        );
      }

      if (hasBottomNeighbour) {
        line(
          cellX + HALF_SCALE,
          cellY + HALF_SCALE,
          cellX + HALF_SCALE,
          cellY + SCALE,
        );
      }

      if (hasLeftNeighbour) {
        line(cellX, cellY + HALF_SCALE, cellX + HALF_SCALE, cellY + HALF_SCALE);
      }
    }
  });
}

function drawStack() {
  STACK.forEach(drawRow);
}

export function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  stroke(255);
  strokeWeight(2);
  fill(255);

  for (let i = 1; i <= ROW_COUNT; i += 1) {
    calculateNextState();
  }
}

export function draw() {
  background(0);
  drawStack();

  scrollOffset += 1;

  if (scrollOffset % SCALE === 0) {
    calculateNextState();
  }
}
