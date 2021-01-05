let timestep = 0;
export function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  stroke(255);
  strokeWeight(3);
}
export function draw() {
  background(0);
  for (let x = 0; x <= window.innerWidth; x += 1) {
    const y = 200 * Math.sin(x + (timestep += 0.0000003));
    point(x, y + Math.floor(window.innerHeight / 2));
  }
}
