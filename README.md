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
