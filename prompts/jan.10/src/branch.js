import p5 from 'p5';

export default function Branch(parent, position, direction) {
  this.position = position;
  this.parent = parent;
  this.direction = direction;
  this.originalDirection = direction.copy();
  this.count = 0;
  this.length = 5;

  this.reset = () => {
    this.direction = this.originalDirection.copy();
    this.count = 0;
  };

  this.next = () => {
    const nextDirection = p5.Vector.mult(this.direction, this.length);
    const nextPosition = p5.Vector.add(this.position, nextDirection);
    const nextBranch = new Branch(this, nextPosition, this.direction.copy());
    return nextBranch;
  };

  this.show = () => {
    stroke(255);
    if (parent !== null) {
      line(
        this.position.x,
        this.position.y,
        this.parent.position.x,
        this.parent.position.y,
      );
    }
  };
}
