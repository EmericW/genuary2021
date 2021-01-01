const IMAGE_1 = require('./images/The_Calling_of_Saint_Matthew.jpg');
const IMAGE_2 = require('./images/Judith_Beheading_Holofernes.jpg');
const IMAGE_3 = require('./images/David_with_the_Head_of_Goliath.jpg');
const IMAGE_4 = require('./images/Crucifixion_of_Saint_Peter.jpg');
const IMAGE_5 = require('./images/Taking_of_Christ.jpg');
const IMAGE_7 = require('./images/Narcissus.jpg');
const IMAGE_8 = require('./images/Nativity_with_St_Francis_and_St_Lawrence.jpg');
const IMAGE_9 = require('./images/Sacrifice_of_Isaac.jpg');
const IMAGE_10 = require('./images/Saint_Jerome_Writing.jpg');
const IMAGE_11 = require('./images/The_Beheading_of_Saint_John.jpg');

if (module.hot) module.hot.accept(() => window.location.reload());

const IMAGES = [
  {
    name: 'The Calling of Saint Matthew',
    src: IMAGE_1,
  },
  {
    name: 'Judith Beheading Holofernes',
    src: IMAGE_2,
  },
  {
    name: 'David with the Head of Goliath',
    src: IMAGE_3,
  },
  {
    name: 'Crucifixion of Saint Peter',
    src: IMAGE_4,
  },
  {
    name: 'Taking of Christ',
    src: IMAGE_5,
  },
  {
    name: 'Narcissus',
    src: IMAGE_7,
  },
  {
    name: 'Nativity with St. Francis and St. Lawrence',
    src: IMAGE_8,
  },
  {
    name: 'Sacrifice of Isaac',
    src: IMAGE_9,
  },
  {
    name: 'Saint Jerome Writing',
    src: IMAGE_10,
  },
  {
    name: 'The Beheading of Saint John',
    src: IMAGE_11,
  },
];

const MARGIN = 40;
const MAX_CANVAS_WIDTH = window.innerWidth - MARGIN * 2;
const MAX_CANVAS_HEIGHT = window.innerHeight - MARGIN * 2;
let IMAGE_WIDTH;
let IMAGE_HEIGHT;
let COLS;
let ROWS;

const TRIANGLE_SIZE = 8;
const TRIANGLE_PIXEL_SIZE = TRIANGLE_SIZE ** 2;

let image;
let imageSource;
let imageData;

function drawImage() {
  for (let y = 0; y < ROWS; y += 1) {
    for (let x = 0; x < COLS; x += 1) {
      let red = 0;
      let green = 0;
      let blue = 0;

      for (let imgY = 0; imgY < TRIANGLE_SIZE; imgY += 1) {
        for (let imgX = 0; imgX < TRIANGLE_SIZE; imgX += 1) {
          const index =
            (y * TRIANGLE_SIZE + imgY) * (imageSource.width * 4) +
            (x * TRIANGLE_SIZE + imgX) * 4;
          const pixelValues = imageData.pixels.slice(index, index + 4);

          red += pixelValues[0];
          green += pixelValues[1];
          blue += pixelValues[2];
        }
      }

      const triangleColor = color(
        red / TRIANGLE_PIXEL_SIZE,
        green / TRIANGLE_PIXEL_SIZE,
        blue / TRIANGLE_PIXEL_SIZE,
      );

      fill(triangleColor);
      triangle(
        x * TRIANGLE_SIZE,
        y * TRIANGLE_SIZE,
        x * TRIANGLE_SIZE + TRIANGLE_SIZE,
        y * TRIANGLE_SIZE,
        x * TRIANGLE_SIZE + TRIANGLE_SIZE,
        y * TRIANGLE_SIZE + TRIANGLE_SIZE,
      );
    }
  }
}

export function preload() {
  image = random(IMAGES);
  imageSource = loadImage(image?.src);
}

export function setup() {
  const note = document.getElementById('note');
  if (note) {
    note.innerHTML = image.name;
  }

  IMAGE_HEIGHT = Math.min(imageSource.height, MAX_CANVAS_HEIGHT);
  imageSource.resize(0, IMAGE_HEIGHT);
  IMAGE_WIDTH = Math.min(imageSource.width, MAX_CANVAS_WIDTH);

  createCanvas(IMAGE_WIDTH, IMAGE_HEIGHT);

  COLS = Math.floor(IMAGE_WIDTH / TRIANGLE_SIZE);
  ROWS = Math.floor(IMAGE_HEIGHT / TRIANGLE_SIZE);

  imageData = createImage(imageSource.width, imageSource.height);
  imageData = imageSource.get();
  imageData.loadPixels();

  noStroke();
  background(0);
  drawImage();
}

export function draw() {}
