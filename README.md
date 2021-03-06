# Genuary 2021

## Prompts
 - [jan.1: Triple nested loop](https://emericw.github.io/genuary2021/prompts/jan.1/dist/)
 - [jan.2: Rule 30 (elementary cellular automaton)](https://emericw.github.io/genuary2021/prompts/jan.2/dist/)
 - [jan.3: Make something human.](https://emericw.github.io/genuary2021/prompts/jan.3/dist/)
 - [jan.4: Small areas of symmetry.](https://emericw.github.io/genuary2021/prompts/jan.4/dist/)
 - [jan.5: Do some code golf! How little code can you write to make something interesting? Share the sketch and its code together if you can.](https://emericw.github.io/genuary2021/prompts/jan.5/dist/)
 - [jan.6: Triangle subdivision.](https://emericw.github.io/genuary2021/prompts/jan.6/dist/)
 - [jan.7: Generate some rules, then follow them by hand on paper.](https://emericw.github.io/genuary2021/prompts/jan.7/dist/)
 - [jan.8: Curve only.](https://emericw.github.io/genuary2021/prompts/jan.8/dist/)
 - [jan.9: Interference patterns.](https://emericw.github.io/genuary2021/prompts/jan.9/dist/)
 - [jan.10: Tree](https://emericw.github.io/genuary2021/prompts/jan.10/dist/)
 - [jan.11: Use something other than a computer as an autonomous process (or use a non-computer random source).](https://emericw.github.io/genuary2021/prompts/jan.11/dist/)
 - [jan.12: Use an API (e.g. the weather).](https://emericw.github.io/genuary2021/prompts/jan.12/dist/)
 - [jan.13: Do not repeat.](https://emericw.github.io/genuary2021/prompts/jan.13/dist/)
 - [jan.14: SUBDIVISION](https://emericw.github.io/genuary2021/prompts/jan.14/dist/)
 - [jan.15: Let someone else decide the general rules of your piece.](https://emericw.github.io/genuary2021/prompts/jan.15/dist/)
 - [jan.16: Circles only.](https://emericw.github.io/genuary2021/prompts/jan.16/dist/)
 - [jan.17: Draw a line, pick a new color, move a bit.](https://emericw.github.io/genuary2021/prompts/jan.17/dist/)
 - [jan.18: One process grows, another process prunes.](https://emericw.github.io/genuary2021/prompts/jan.18/dist/)
 - [jan.19: Increase the randomness along the Y-axis.](https://emericw.github.io/genuary2021/prompts/jan.19/dist/)
 - [jan.20: No loops.](https://emericw.github.io/genuary2021/prompts/jan.20/dist/)
 - [jan.21: function f(x) { DRAW(x); f(1 * x / 4); f(2 * x / 4); f(3 * x / 4); }.](https://emericw.github.io/genuary2021/prompts/jan.21/dist/)
 - [jan.22: Draw a line. Wrong answers only.](https://emericw.github.io/genuary2021/prompts/jan.22/dist/)
 - [jan.23: #264653 #2a9d8f #e9c46a #f4a261 #e76f51, no gradients. Optionally, you can use a black or white background.](https://emericw.github.io/genuary2021/prompts/jan.23/dist/)
 - [jan.24: 500 lines.](https://emericw.github.io/genuary2021/prompts/jan.24/dist/)
 - [jan.25: Make a grid of permutations of something.](https://emericw.github.io/genuary2021/prompts/jan.25/dist/)
 - [jan.26: 2D Perspective.](https://emericw.github.io/genuary2021/prompts/jan.26/dist/)
 - [jan.27: Monochrome gradients without lines.](https://emericw.github.io/genuary2021/prompts/jan.27/dist/)
 - [jan.28-29: Use sound. - Any shape, none can touch.](https://emericw.github.io/genuary2021/prompts/jan.28-29/dist/)
 - [jan.30: Replicate a natural concept (e.g. gravity, flocking, path following).](https://emericw.github.io/genuary2021/prompts/jan.30/dist/)
 - [jan.31: Search for "eno's oblique strategies", obtain one, that is your prompt for today.](https://emericw.github.io/genuary2021/prompts/jan.31/dist/)

## Run localy
node version 14.12.x
```
yarn
// cd into the prompt you wan't to run
cd prompts/jan.1
yarn start
```

## Generate new prompt
```
cp -r resources/template prompts/jan.x
```

## Video export code snippits
```
// include script
<script src="../../../whammy.js"></script>

// top level
const encoder = new Whammy.Video(45);

// draw()
encoder.add(drawingContext);

if (frameCount === 45 * 10) {
  encoder.compile(false, function (output) {
    window.open(URL.createObjectURL(output));
  });
  noLoop();
}
```
