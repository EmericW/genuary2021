/* eslint-disable */
import p5 from 'p5';

import * as sketch from './sketch';

for (const opt in sketch) {
  window[opt] = sketch[opt];
}

const instance = new p5();

