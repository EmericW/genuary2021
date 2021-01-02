import p5 from 'p5';

export default function Point(angle, radius) {
  this.angle = angle;
  this.radius = radius;

  this.applyForce = (force) => {
    this.radius += force;
    return this;
  };

  this.getCoordinates = () => {
    return p5.Vector.fromAngle(this.angle, this.radius);
  };

  this.draw = () => {
    strokeWeight(2);
    const coordinates = this.getCoordinates();
    point(coordinates.x, coordinates.y);
  };
}
