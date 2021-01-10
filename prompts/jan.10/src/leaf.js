export default function Leaf() {
  const angle = random(0, TWO_PI);
  const radius = random(200, 400);

  const x = radius * Math.sin(angle);
  const y = radius * Math.cos(angle);
  this.position = createVector(width / 2 + x, height / 2 + y);
  this.reached = false;

  this.show = () => {
    if (this.reached) {
      return;
    }

    fill(255);
    noStroke();
    ellipse(this.position.x, this.position.y, 4, 4);
  };
}
