function Particle({ x, y, size, maximumTravelDistance }) {
  this.pos = createVector(x, y);
  this.size = size;
  this.offset = createVector(0, 0);
  this.maximumTravelDistance = maximumTravelDistance;
  this.resistance = 0.8;

  this.applyForce = (force) => {
    this.offset.add(force).mult(this.resistance);
  };

  this.getCoordinates = () => this.pos;

  this.draw = () => {
    circle(this.pos.x + this.offset.x, this.pos.y + this.offset.y, this.size);
  };
}

export default Particle;
