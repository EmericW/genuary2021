import p5 from 'p5';
import Branch from './branch';
import Leaf from './leaf';

export const MAX_DISTANCE = 200;
export const MIN_DISTANCE = 2;

export default function Tree() {
  this.leaves = [];
  this.branches = [];

  for (let i = 0; i < 500; i += 1) {
    this.leaves.push(new Leaf());
  }

  const position = createVector(width / 2, height / 2 + 300);
  const direction = createVector(0, -1);
  const root = new Branch(null, position, direction);
  this.branches.push(root);

  let found = false;
  let current = root;

  while (!found) {
    for (let i = 0; i < this.leaves.length; i += 1) {
      const distance = p5.Vector.dist(
        current.position,
        this.leaves[i].position,
      );
      if (distance < MAX_DISTANCE) {
        found = true;
      }
    }

    if (!found) {
      const branch = current.next();
      current = branch;
      this.branches.push(current);
    }
  }

  this.grow = () => {
    for (let i = 0; i < this.leaves.length; i += 1) {
      const leaf = this.leaves[i];

      let closestBranch = null;
      let closestDistance = Infinity;

      for (let j = 0; j < this.branches.length; j += 1) {
        const branch = this.branches[j];
        const distance = p5.Vector.dist(leaf.position, branch.position);

        if (distance < MIN_DISTANCE) {
          leaf.reached = true;
          closestBranch = null;
          break;
        } else if (distance > MAX_DISTANCE) {
        } else if (closestBranch === null || distance < closestDistance) {
          closestBranch = branch;
          closestDistance = distance;
        }
      }

      if (closestBranch !== null) {
        const newDirection = p5.Vector.sub(
          leaf.position,
          closestBranch.position,
        );
        newDirection.normalize();
        closestBranch.direction.add(newDirection);
        closestBranch.count += 1;
      }
    }

    for (let i = this.leaves.length - 1; i >= 0; i -= 1) {
      if (this.leaves[i].reached) {
        this.leaves.splice(i, 1);
      }
    }

    for (let i = this.branches.length - 1; i >= 0; i -= 1) {
      const branch = this.branches[i];

      if (branch.count > 0) {
        branch.direction.div(branch.count + 1);
        this.branches.push(branch.next());
      }

      branch.reset();
    }
  };

  this.show = () => {
    for (let i = 0; i < this.branches.length; i += 1) {
      this.branches[i].show();
    }
  };
}
