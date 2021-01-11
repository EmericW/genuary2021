import { differenceInMinutes, parse } from 'date-fns';
import { convertToLocalTime } from 'date-fns-timezone';
import p5 from 'p5';
import data from './data.json';

if (module.hot) module.hot.accept(() => window.location.reload());

const MIDDLE_WIDTH = Math.floor(window.innerWidth / 2);
const MIDDLE_HEIGTH = Math.floor(window.innerHeight / 2);
const ANGLE_INTERVAL = (2 * Math.PI) / data.length;
const BASE_RADIUS = 100;
const TIMEZONE = 'Etc/UTC';

const TRANSFORMED_DATA = data.map((day) => {
  const dateParts = day.date.split('-');

  const dayLength = differenceInMinutes(
    parse(day?.day_length, 'HH:mm:ss', new Date()),
    parse('00:00:00', 'HH:mm:ss', new Date()),
  );

  const sunrise = parse(day?.sunrise, 'hh:mm:ss a', new Date(...dateParts));

  const sunriseInMinutes = differenceInMinutes(
    convertToLocalTime(sunrise, {
      timeZone: TIMEZONE,
    }),
    parse('00:00:00', 'HH:mm:ss', new Date(...dateParts)),
  );

  const sunset = parse(day?.sunset, 'hh:mm:ss a', new Date(...dateParts));

  const sunsetInMinutes = differenceInMinutes(
    convertToLocalTime(sunset, {
      timeZone: TIMEZONE,
    }),
    parse('00:00:00', 'HH:mm:ss', new Date(...dateParts)),
  );

  return {
    dayLength,
    sunrise: sunriseInMinutes,
    sunset: sunsetInMinutes,
  };
});

export function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background(0);
  stroke(255);
  noFill();
}

export function draw() {
  translate(MIDDLE_WIDTH, MIDDLE_HEIGTH);
  rotate(-Math.PI / 2);
  strokeWeight(2);

  beginShape();
  TRANSFORMED_DATA.forEach((day, i) => {
    const { sunrise } = day;
    const sunriseOffset = map(sunrise, 0, 60 * 24, 0, 200);

    const p1 = p5.Vector.fromAngle(
      i * ANGLE_INTERVAL,
      BASE_RADIUS + sunriseOffset,
    );

    vertex(p1.x, p1.y);
  });
  endShape(CLOSE);

  beginShape();
  TRANSFORMED_DATA.forEach((day, i) => {
    const { sunset } = day;
    const sunsetOffset = map(sunset, 0, 60 * 24, 0, 200);

    const p2 = p5.Vector.fromAngle(
      i * ANGLE_INTERVAL,
      BASE_RADIUS + sunsetOffset,
    );

    vertex(p2.x, p2.y);
  });
  endShape(CLOSE);

  noLoop();
}
