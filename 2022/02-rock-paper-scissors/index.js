const pointsMap = { 'X': 1, 'Y': 2, 'Z': 3};
const rules = {
    'win': {
        'C': 'X',
        'A': 'Y',
        'B': 'Z'
    },
    'draw': {
        'A': 'X',
        'B': 'Y',
        'C': 'Z'
    },
    'lose': {
        'A': 'Z',
        'B': 'X',
        'C': 'Y'
    }
};

function isWin(a,b) {
  return ((b === 'X' && a === 'C') || (b === 'Y' && a === 'A') || (b === 'Z' && a === 'B'));
}

function isDraw(a,b) {
  return ((b === 'X' && a === 'A') || (b === 'Y' && a === 'B') || (b === 'Z' && a === 'C'));
}

async function partOne(rl) {
  let score = 0;

  for await (const line of rl) {
    let [opponent, me] = line.split(' ');

    if(isWin(opponent, me)){
        score += 6;
    } else if (isDraw(opponent, me)) {
        score += 3;
    } // else stays 0

    score += pointsMap[me];
  }

  console.log(score);
}

async function partTwo(rl) {
  let score = 0;

  for await (const line of rl) {
    let [opponent, me] = line.split(' ');
    let shapeToUse;

    if(me === 'Z'){
      score += 6;
      shapeToUse = rules['win'][opponent];
    } else if (me === 'Y') {
      score += 3;
      shapeToUse = rules['draw'][opponent];
    } else {
      shapeToUse = rules['lose'][opponent];
    }

    score += pointsMap[shapeToUse];
  }

  console.log(score);
}

module.exports = { partOne, partTwo };
