import Point from './point';
import Sweeper, {
  MAX_SWEEPER_RADIUS,
  MIN_SWEEPER_RADIUS,
  SWEEPER_RANGE,
  SWEEPER_STATUS_IDLE,
  SWEEPER_STATUS_RETRACTING,
  SWEEPER_STATUS_ROTATING,
  SWEEPER_STATUS_SWEEPING,
} from './sweeper';

if (module.hot) module.hot.accept(() => window.location.reload());

const MARGIN = 40;
const CANVAS_WIDTH = window.innerWidth - MARGIN * 2;
const CANVAS_HEIGHT = window.innerHeight - MARGIN * 2;
const CENTER_WIDTH = Math.floor(CANVAS_WIDTH / 2);
const CENTER_HEIGHT = Math.floor(CANVAS_HEIGHT / 2);
const FRAME_RATE = 60;
const PARTICLE_COUNT = 1000;
const MAX_RADIUS_THRESHOLD = MAX_SWEEPER_RADIUS - 50;

let sweeper;

let points = [];

function generateFullSweepSequence() {
  let sequence = [];
  const angleInterval = TWO_PI / 15;

  for (let angle = 0; angle <= TWO_PI; angle += angleInterval) {
    sequence = [
      ...sequence,
      {
        status: SWEEPER_STATUS_ROTATING,
        value: angleInterval,
      },
      {
        status: SWEEPER_STATUS_IDLE,
        value: 10,
      },
      {
        status: SWEEPER_STATUS_SWEEPING,
        value: SWEEPER_RANGE,
      },
      {
        status: SWEEPER_STATUS_IDLE,
        value: 10,
      },
      {
        status: SWEEPER_STATUS_RETRACTING,
        value: SWEEPER_RANGE,
      },
      {
        status: SWEEPER_STATUS_IDLE,
        value: 10,
      },
    ];
  }

  return sequence;
}

function generateDanceSequence(steps) {
  let sequence = [];
  const cycles = random([2, 3, 4]);

  for (let i = 0; i < cycles; i += 1) {
    sequence = [...sequence, ...JSON.parse(JSON.stringify(steps))];
  }

  return sequence;
}

function generateDanceSequence1() {
  return generateDanceSequence([
    {
      status: SWEEPER_STATUS_IDLE,
      value: 10,
    },
    {
      status: SWEEPER_STATUS_ROTATING,
      value: -0.5,
    },
    {
      status: SWEEPER_STATUS_IDLE,
      value: 10,
    },
    {
      status: SWEEPER_STATUS_ROTATING,
      value: +0.5,
    },
  ]);
}

function generateDanceSequence2() {
  return generateDanceSequence([
    {
      status: SWEEPER_STATUS_IDLE,
      value: 10,
    },
    {
      status: SWEEPER_STATUS_SWEEPING,
      value: 25,
    },
    {
      status: SWEEPER_STATUS_IDLE,
      value: 10,
    },
    {
      status: SWEEPER_STATUS_RETRACTING,
      value: 25,
    },
  ]);
}

export function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  stroke(255);
  frameRate(FRAME_RATE);

  for (let i = 0; i <= PARTICLE_COUNT; i += 1) {
    points = [
      ...points,
      new Point(map(Math.random(), 0, 1, 0, 2 * PI), MIN_SWEEPER_RADIUS + 50),
    ];
  }

  sweeper = new Sweeper(
    radians(180),
    ({ previousMove, movementQueue, queueSequence }) => {
      if (movementQueue.length === 0 && previousMove) {
        if (previousMove.status === SWEEPER_STATUS_SWEEPING) {
          queueSequence([
            {
              status: SWEEPER_STATUS_IDLE,
              value: 100,
            },
            {
              status: SWEEPER_STATUS_RETRACTING,
              value: SWEEPER_RANGE,
            },
          ]);
        } else if (previousMove.status === SWEEPER_STATUS_RETRACTING) {
          const isMaxRadiusThresholdExceeded = !!points.filter(
            ({ radius }) => radius >= MAX_RADIUS_THRESHOLD,
          ).length;

          if (isMaxRadiusThresholdExceeded) {
            queueSequence(generateFullSweepSequence());
          } else if (Math.random() > 0.8) {
            queueSequence(generateDanceSequence1());
          } else if (Math.random() > 0.8) {
            queueSequence(generateDanceSequence2());
          } else {
            queueSequence([
              {
                status: SWEEPER_STATUS_IDLE,
                value: 100,
              },
              {
                status: SWEEPER_STATUS_ROTATING,
                value: map(Math.random(), 0, 1, PI / 4, 2 * PI),
              },
            ]);
          }
        } else if (previousMove.status === SWEEPER_STATUS_ROTATING) {
          queueSequence([
            {
              status: SWEEPER_STATUS_IDLE,
              value: 100,
            },
            {
              status: SWEEPER_STATUS_SWEEPING,
              value: SWEEPER_RANGE,
            },
          ]);
        }
      }
    },
  );

  sweeper.queueSequence([
    {
      status: SWEEPER_STATUS_IDLE,
      value: 100,
    },
    {
      status: SWEEPER_STATUS_ROTATING,
      value: map(Math.random(), 0, 1, PI / 4, 2 * PI),
      speed: random(0.02, 0.05),
    },
  ]);
}

export function draw() {
  background(0);
  translate(CENTER_WIDTH, CENTER_HEIGHT);

  for (let i = 0; i < points.length; i += 1) {
    const pointInstance = points[i];

    if (sweeper.isParticleInSweeperRange(pointInstance)) {
      pointInstance.applyForce(-sweeper.sweepingSpeed);
    } else {
      pointInstance.applyForce(0.007);
      pointInstance.draw();
    }
  }

  sweeper.draw();
}
