import p5 from 'p5';

export const SWEEPER_STATUS_IDLE = 'idle';
export const SWEEPER_STATUS_SWEEPING = 'sweeping';
export const SWEEPER_STATUS_RETRACTING = 'retrackting';
export const SWEEPER_STATUS_ROTATING = 'rotating';

export const SWEEPING_SPEED = 1.2;
export const RETRACKTING_SPEED = 2;
export const ANGULAR_SPEED = 0.035;
export const SWEEPER_LENGTH = 125;
export const MAX_SWEEPER_RADIUS = (window.innerHeight - 2 * 40) / 2 - 50;
export const MIN_SWEEPER_RADIUS = MAX_SWEEPER_RADIUS * 0.3;
export const SWEEPER_RANGE = MAX_SWEEPER_RADIUS - MIN_SWEEPER_RADIUS;
export const QUARTER_PI = Math.PI / 4;

export default function Sweeper(
  initialAngle = 0,
  onMoveFinished = null,
  initialRadius = MAX_SWEEPER_RADIUS,
  minSweeperRadius = MIN_SWEEPER_RADIUS,
  maxSweeperRadius = MAX_SWEEPER_RADIUS,
  sweepingSpeed = SWEEPING_SPEED,
  retracktingSpeed = RETRACKTING_SPEED,
  angularSpeed = ANGULAR_SPEED,
  sweeperLength = SWEEPER_LENGTH,
) {
  this.angle = initialAngle;
  if (typeof onMoveFinished === 'function') {
    this.onMoveFinished = onMoveFinished.bind(this);
  }

  this.radius = initialRadius;
  this.minSweeperRadius = minSweeperRadius;
  this.maxSweeperRadius = maxSweeperRadius;
  this.sweepingSpeed = sweepingSpeed;
  this.retracktingSpeed = retracktingSpeed;
  this.angularSpeed = angularSpeed;
  this.sweeperLength = sweeperLength;
  this.halfSweeperLength = Math.floor(sweeperLength / 2);

  this.currentMove = null;
  this.movementQueue = [];
  this.movementHistory = [];

  this.queueMove = (move) => {
    if (move.status === SWEEPER_STATUS_ROTATING) {
      if (move.value > PI) {
        move.value -= PI;
        move.speed = -Math.abs(move.speed || ANGULAR_SPEED);
      } else if (move.value < 0) {
        move.value = Math.abs(move.value);
        move.speed = -Math.abs(move.speed || ANGULAR_SPEED);
      }
    }

    this.movementQueue = [...this.movementQueue, move];
    this.cycleMove();
  };

  this.queueSequence = (sequence) => {
    sequence.forEach(this.queueMove);
  };

  this.cycleMove = () => {
    if (this.currentMove?.value > 0) return;

    const previousMove = this.currentMove;
    this.movementHistory = [...this.movementHistory, previousMove];

    if (this.movementQueue.length === 0) {
      this.currentMove = null;
    } else {
      this.currentMove = this.movementQueue.shift();
    }

    if (typeof this.onMoveFinished === 'function') {
      this.onMoveFinished({
        previousMove,
        currentMove: this.currentMove,
        movementQueue: this.movementQueue,
        movementHistory: this.movementHistory,
        queueSequence: this.queueSequence,
        queueMove: this.queueMove,
      });
    }
  };

  this.executeMove = () => {
    if (this.currentMove === null) return;

    switch (this.currentMove.status) {
      case SWEEPER_STATUS_IDLE:
        this.currentMove.value -= 1;
        break;
      case SWEEPER_STATUS_SWEEPING:
        this.currentMove.value -= this.sweepingSpeed;
        this.radius -= this.currentMove.speed || sweepingSpeed;
        break;
      case SWEEPER_STATUS_RETRACTING:
        this.currentMove.value -=
          this.currentMove.speed || this.retracktingSpeed;
        this.radius += this.currentMove.speed || this.retracktingSpeed;
        break;
      case SWEEPER_STATUS_ROTATING:
        this.angle += this.currentMove.speed || this.angularSpeed;
        this.currentMove.value -= Math.abs(
          this.currentMove.speed || this.angularSpeed,
        );

        if (this.angle > TWO_PI) {
          this.angle -= TWO_PI;
        } else if (this.angle < 0) {
          this.angle = TWO_PI - this.angle;
        }
        break;
      default:
        break;
    }

    this.cycleMove();
  };

  this.draw = () => {
    strokeWeight(5);

    this.executeMove();

    const deltaTheta = Math.atan(this.halfSweeperLength / this.radius);
    const theta1 = this.angle + deltaTheta;
    const theta2 = this.angle - deltaTheta;
    const outsideRadius = this.radius / Math.cos(deltaTheta);

    const sweeperAnchor1 = p5.Vector.fromAngle(theta1, outsideRadius);
    const sweeperAnchor2 = p5.Vector.fromAngle(theta2, outsideRadius);

    stroke(255);
    line(
      sweeperAnchor1.x,
      sweeperAnchor1.y,
      sweeperAnchor2.x,
      sweeperAnchor2.y,
    );
  };

  this.getStatus = () => {
    if (!this.currentMove) return SWEEPER_STATUS_IDLE;

    return this.currentMove.status;
  };

  this.isParticleInSweeperRange = (particle) => {
    let theta = Math.abs(this.angle - particle.angle);

    if (theta > Math.PI) {
      theta = 2 * Math.PI - theta;
    }

    if (theta > QUARTER_PI || theta < -QUARTER_PI) return false;

    const y1 = Math.sin(theta) * particle.radius;
    const y2 = Math.cos(theta) * particle.radius;
    const y3 = this.radius - y2;
    const x = y3 / Math.cos(theta);

    return x <= 0 && Math.abs(y1) <= Math.abs(this.halfSweeperLength);
  };
}
