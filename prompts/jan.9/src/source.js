export default function Source(x, y, radius = 0) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.waveLength = random(200, 350);
  this.propogationSpeed = random(1, 4);
  this.frequence = random(0.1, 0.2);

  this.propogate = () => {
    this.radius += this.propogationSpeed;
    return this;
  };

  this.getAmplitudeForCoordinates = (coordinates) => {
    const distanceFromCenter = Math.sqrt(
      Math.abs((coordinates.x - this.x) ** 2 + (coordinates.y - this.y) ** 2),
    );
    const distanceFromEdge = this.radius - distanceFromCenter;

    if (
      this.radius >= distanceFromCenter &&
      this.waveLength >= distanceFromEdge
    ) {
      return (
        Math.sin(distanceFromEdge * this.frequence) *
        map(distanceFromEdge, 0, this.waveLength, 1, 0)
      );
    }

    return 0;
  };

  this.draw = () => {
    noFill();
    strokeWeight(1);
    stroke(255);
    circle(this.x, this.y, this.radius * 2);
  };
}
