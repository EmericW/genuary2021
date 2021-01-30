/**
 * @param name
 * @param averageOrbitalDistance // in km
 * @param orbitalVelocity // in km/h
 */
function Planet(name, averageOrbitalDistance, orbitalVelocity) {
  this.name = name;
  this.averageOrbitalDistance = averageOrbitalDistance;
  this.orbitalVelocity = orbitalVelocity;
  this.orbitalCircumference = Math.PI * this.averageOrbitalDistance * 2;

  this.calculateSolarAngle = (deltaTime) => {
    const angularVelocity = map(
      this.orbitalVelocity,
      0,
      this.orbitalCircumference,
      0,
      2 * Math.PI,
    ); // angular velocity per hour

    return angularVelocity * deltaTime;
  };
}

export default Planet;
