export default function Segment(root, destination) {
  this.root = root;
  this.destination = destination;
  this.length = 0;
  this.angle = Math.atan2(
    this.destination.x - this.root.x,
    this.destination.y - this.root.y,
  );
  this.distance = Math.sqrt(
    Math.abs(
      (this.root.x - this.destination.x) ** 2 +
        (this.root.y - this.destination.y) ** 2,
    ),
  );
  this.reached = false;

  this.grow = () => {
    if (this.reached) return;

    this.length += 10;

    if (this.length >= this.distance) {
      this.length = this.destination;
      this.reached = true;
    }
  };

  this.show = () => {
    const deltaX = this.length * Math.sin(this.angle);
    const deltaY = this.length * Math.cos(this.angle);

    stroke(255);
    strokeWeight(30);
    line(this.root.x, this.root.y, this.root.x + deltaX, this.root.y + deltaY);

    stroke(0);
    strokeWeight(26);
    line(this.root.x, this.root.y, this.root.x + deltaX, this.root.y + deltaY);
  };
}
