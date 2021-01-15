if (module.hot) module.hot.accept(() => window.location.reload());

const MARGIN = 40;
const CANVAS_WIDTH = window.innerWidth;
const CANVAS_HEIGHT = window.innerHeight - MARGIN * 2;
const SCALE = 15;
const ROWS = Math.ceil(CANVAS_HEIGHT / SCALE);
const COLS = Math.ceil(CANVAS_WIDTH / SCALE);
let timestep = 0;
const UNICODE_OFFSET = 8736;
const UNICODE_RANGE = 223;
let charactersOrderedByArea = [];
const OPACITIES = [100, 200, 255];

export function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);

  for (let i = 0; i <= UNICODE_RANGE; i += 1) {
    const character = String.fromCharCode(i + UNICODE_OFFSET);
    const {
      width,
      actualBoundingBoxAscent,
      actualBoundingBoxDescent,
    } = drawingContext.measureText(character);
    const area = width * (actualBoundingBoxAscent + actualBoundingBoxDescent);

    charactersOrderedByArea = [
      ...charactersOrderedByArea,
      {
        character,
        area,
      },
    ];
  }

  charactersOrderedByArea = charactersOrderedByArea.sort((a, b) => {
    if (a.area < b.area) {
      return -1;
    }
    if (a.area > b.area) {
      return 1;
    }

    return 0;
  });
}

export function draw() {
  background(0);
  textSize(SCALE + 2);
  textAlign(LEFT, TOP);

  const timestepOffset = Math.sin(timestep * 3);

  for (let x = 0; x < COLS; x += 1) {
    for (let y = 0; y < ROWS; y += 1) {
      const value = noise(x * 0.02, y * 0.02, timestep + timestepOffset);
      const characterIndex = Math.floor(
        map(value, 0, 1, 0, charactersOrderedByArea.length + 1),
      );

      const { character } = charactersOrderedByArea[characterIndex];

      let opacity = 0;
      if (value > 0.25) {
        const opacityIndex = Math.floor(
          map(value, 0, 1, 0, OPACITIES.length - 1),
        );
        opacity = OPACITIES[opacityIndex];
      }

      fill(255, 255, 255, opacity);
      text(character, x * SCALE, y * SCALE);
    }
  }

  timestep += 0.005;
}
