import Planet from './planet';

if (module.hot) module.hot.accept(() => window.location.reload());

const MARGIN = 40;
const CANVAS_WIDTH = window.innerWidth - MARGIN * 2;
const CANVAS_HEIGHT = window.innerHeight - MARGIN * 2;
const HALF_CANVAS_WIDTH = CANVAS_WIDTH / 2;
const HALF_CANVAS_HEIGHT = CANVAS_HEIGHT / 2;
let TIME_INTERVAL;
const MAX_ORBIT_PIXEL_DISTANCE = HALF_CANVAS_HEIGHT - 50;
const MAXIMUM_NUMBER_OF_LINES = 2000;

const MERCURY = new Planet('Mercury', 57909227, 170503);
const VENUS = new Planet('Venus', 108209475, 126074);
const EARTH = new Planet('Earth', 149598262, 107218);
const MARS = new Planet('Mars', 227943824, 86677);
const JUPITER = new Planet('Jupiter', 778340821, 47002);
const SATURN = new Planet('Saturn', 1426666422, 34701);
const URANUS = new Planet('Uranus', 2870658186, 24477);
const NEPTUNE = new Planet('Neptune', 4498396441, 19566);
const PLUTO = new Planet('Pluto', 5906440628, 16809); // <3

const ALL_PLANETS = [
  MERCURY,
  VENUS,
  EARTH,
  MARS,
  JUPITER,
  SATURN,
  URANUS,
  NEPTUNE,
  PLUTO,
];

let planets = [];

let MAX_ORBIT_DISTANCE = 0;

let hour = 0;
let lines = [];

function drawLine({ from, to, opacity }) {
  stroke(255, 255, 255, opacity);
  line(from.x, from.y, to.x, to.y);
}

function drawLines() {
  strokeWeight(1);
  lines.forEach((line, i) =>
    drawLine({ ...line, opacity: map(i, 0, MAXIMUM_NUMBER_OF_LINES, 255, 0) }),
  );
}

function setNoteText() {
  const note = document.getElementById('note');
  const planetNames = planets.map(({ name }) => name).join(' - ');
  if (note) {
    note.innerHTML = `${planetNames} | Year: ${Math.floor(hour / (24 * 365))}`;
  }
}

function drawCenter() {
  stroke(255);
  strokeWeight(15);
  point(0, 0);
}

export function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  textFont('Cousine');
  textSize(15);

  // if the planets are ordered in line beginning from the sin
  // select a random planet (between the first and second to last) and the next planet in line
  // full random selection of planets might result in 2 planets that are to far apart to create a nice visual effect
  const planetIndex = Math.floor(random(0, ALL_PLANETS.length - 1));
  planets = [ALL_PLANETS[planetIndex], ALL_PLANETS[planetIndex + 1]];

  MAX_ORBIT_DISTANCE = planets.reduce((maximum, planet) => {
    if (!maximum) return planet;
    if (planet.averageOrbitalDistance > maximum.averageOrbitalDistance)
      return planet;

    return maximum;
  }, null).averageOrbitalDistance;

  TIME_INTERVAL = planets[1]?.orbitalCircumference / 10000000;
}

export function draw() {
  background(0);
  translate(HALF_CANVAS_WIDTH, HALF_CANVAS_HEIGHT);

  fill(255);
  strokeWeight(1);

  planets
    // calculate points for planets
    .map((planet) => {
      const solarAngle = planet.calculateSolarAngle(hour);
      const radius = map(
        planet.averageOrbitalDistance,
        0,
        MAX_ORBIT_DISTANCE,
        0,
        MAX_ORBIT_PIXEL_DISTANCE,
      );

      const x = cos(solarAngle) * radius;
      const y = sin(solarAngle) * radius;

      return {
        x,
        y,
        color: planet.color,
      };
    })
    .forEach((point, i, points) => {
      const from = point;
      const to = points[i % (points.length - 1)];
      lines = [{ from, to, color: from.color }, ...lines];
    });

  lines = lines.slice(0, MAXIMUM_NUMBER_OF_LINES);

  drawLines();
  drawCenter();
  setNoteText();

  hour += TIME_INTERVAL;
}
