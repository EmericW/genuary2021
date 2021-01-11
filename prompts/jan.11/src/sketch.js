import Segment from './segment';

if (module.hot) module.hot.accept(() => window.location.reload());

const MARGIN = 40;
const CANVAS_WIDTH = window.innerWidth;
const CANVAS_HEIGHT = window.innerHeight - MARGIN * 2;
const HALF_CANVAS_WIDTH = Math.floor(CANVAS_WIDTH / 2);
const HALF_CANVAS_HEIGHT = Math.floor(CANVAS_HEIGHT / 2);

const CHARACTERS = 'abcdefghijklmnopqrstuvwxyz';
const PARTS = [
  "encouraging and tactful notes from Ian Tattersal of the American Museum of Natural History pointing out, inter alia, that Perigueux is not a wineproducing region, that it is inventive but a touch unorthodox of me to italicize taxonomic divisions above the level of genus and species, that I have persistently misspelled Olorgesaille, a place that I recently visited, and so on in similar vein through two chapters of text covering his area of expertise, early humans. Goodness knows how many other inky embarrassments may lurk in these pages yet, but it is thanks to Dr. Tattersall and all of those whom I am about to mention that there aren't many hundreds more. I cannot begin to thank adequately those who helped me in the preparation of this book. I am especially indebted to the following, who were uniformly generous and kindly and showed the most heroic reserves of patience in answering one simple, endlessly repeated question: \"I'm sorry, but can you explain that again?",
  "Welcome. And congratulations. I am delighted that you could make it. Getting here wasn't easy, I know. In fact, I suspect it was a little tougher than you realize. To begin with, for you to be here now trillions of drifting atoms had somehow to assemble in an intricate and intriguingly obliging manner to create you. It's an arrangement so specialized and particular that it has never been tried before and will only exist this once. For the next many years (we hope) these tiny particles will uncomplainingly engage in all the billions of deft, cooperative efforts necessary to keep you intact and let you experience the supremely agreeable but generally underappreciated state known as existence.",
  'So if Pluto really is a planet, it is certainly an odd one. It is very tiny: just one-quarter of 1 percent as massive as Earth. If you set it down on top of the United States, it would cover not quite half the lower forty-eight states. This alone makes it extremely anomalous; it means that our planetary system consists of four rocky inner planets, four gassy outer giants, and a tiny, solitary iceball. Moreover, there is every reason to suppose that we may soon begin to find other even larger icy spheres in the same portion of space. Then we will have problems. After Christy spotted Pluto’s moon, astronomers began to regard that section of the cosmos more attentively and as of early December 2002 had found over six hundred additional Trans-Neptunian Objects, or Plutinos as they are alternatively called. One, dubbed Varuna, is nearly as big as Pluto’s moon. Astronomers now think there may be billions of these objects. The difficulty is that many of them are awfully dark. Typically they have an albedo, or reflectiveness, of just 4 percent, about the same as a lump of charcoal—and of course these lumps of',
  'Such are the distances, in fact, that it isn’t possible, in any practical terms, to draw the solar system to scale. Even if you added lots of fold-out pages to your textbooks or used a really long sheet of poster paper, you wouldn’t come close. On a diagram of the solar system to scale, with Earth reduced to about the diameter of a pea, Jupiter would be over a thousand feet away and Pluto would be a mile and a half distant (and about the size of a bacterium, so you wouldn’t be able to see it anyway). On the same scale, Proxima Centauri, our nearest star, would be almost ten thousand miles away. Even if you shrank down everything so that Jupiter was as small as the period at the end of this sentence, and Pluto was no bigger than a molecule, Pluto would still be over thirty-five feet away. So the solar system is really quite enormous. By the time we reach Pluto, we have come so far that the Sun—our dear, warm, skin-tanning, life-giving Sun—has shrunk to the size of a pinhead. It is little more than a bright star',
];
const RADIUS = 300;

let input;
let inputIndex = -1;
let characterAngleMap;
let currentSegment;

function cycleInputIndex() {
  if (inputIndex === input.length - 1) {
    inputIndex = 0;
  } else {
    inputIndex += 1;
  }
  const newCharacter = input[inputIndex];

  if (!CHARACTERS.includes(newCharacter)) {
    cycleInputIndex();
  } else {
    currentSegment = new Segment(
      {
        x: currentSegment?.destination?.x || 0,
        y: currentSegment?.destination?.y || 0,
      },
      {
        x: RADIUS * Math.sin(characterAngleMap[newCharacter]),
        y: RADIUS * Math.cos(characterAngleMap[newCharacter]),
      },
    );
  }
}

export function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  input = random(PARTS).toLowerCase().split('');

  characterAngleMap = CHARACTERS.split('').reduce(
    (result, character, index) => ({
      ...result,
      [character]: index * (TWO_PI / CHARACTERS.length),
    }),
    {},
  );

  cycleInputIndex();
}

export function draw() {
  translate(HALF_CANVAS_WIDTH, HALF_CANVAS_HEIGHT);
  stroke(255);
  strokeWeight(1);
  textSize(32);
  fill(255);

  // Object.keys(characterAngleMap).forEach((character) => {
  //   text(
  //     character,
  //     (RADIUS + 50) * Math.sin(characterAngleMap[character]),
  //     (RADIUS + 50) * Math.cos(characterAngleMap[character]),
  //   );
  // });

  currentSegment.grow();
  currentSegment.show();

  if (currentSegment.reached) {
    cycleInputIndex();
  }
}
