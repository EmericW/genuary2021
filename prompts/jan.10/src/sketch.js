import Tree from './tree';

if (module.hot) module.hot.accept(() => window.location.reload());

let tree;

const MARGIN = 40;
const CANVAS_WIDTH = window.innerWidth;
const CANVAS_HEIGHT = window.innerHeight - MARGIN * 2;

export function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);

  tree = new Tree();
}

export function draw() {
  tree.show();
  tree.grow();
}
