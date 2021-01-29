export default function Source({ x, y, radius = 0 }) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.waveLength = random(200, 600);
  this.propogationSpeed = random(2, 5);
  this.frequence = random(0.05, 0.05);

  this.propogate = () => {
    this.radius += this.propogationSpeed;
    return this;
  };

  this.getForceAngleForCoordinates = (coordinates) => {
    return Math.atan2(coordinates.x - this.x, coordinates.y - this.y);
  };

  this.getDistanceFromCenter = (coordinates) => {
    return Math.sqrt(
      Math.abs((coordinates.x - this.x) ** 2 + (coordinates.y - this.y) ** 2),
    );
  };

  this.getAmplitudeForCoordinates = (distanceFromCenter) => {
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
}
