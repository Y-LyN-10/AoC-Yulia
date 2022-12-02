function isWin(a,b) {
    return ((b === 'X' && a === 'C') || (b === 'Y' && a === 'A') || (b === 'Z' && a === 'B'));
}

function isDraw(a,b) {
    return ((b === 'X' && a === 'A') || (b === 'Y' && a === 'B') || (b === 'Z' && a === 'C'));
}

module.exports = async function (rl) {
  let score = 0;
  const pointsMap = { 'X': 1, 'Y': 2, 'Z': 3};

  // Solution for Part 1 of the task

  // for await (const line of rl) {
  //   let [opponent, me] = line.split(' ');
  //
  //   if(isWin(opponent, me)){
  //       score += 6;
  //   } else if (isDraw(opponent, me)) {
  //       score += 3;
  //   } // else stays 0
  //
  //   score += pointsMap[me];
  // }
  //
  // console.log(score);

  // part 2 is to use a completely different strategy (rules)
  // X = need to lose, Y = need to end the round in draw and Z = need to win
  // the output is calculated the same way

  let rules = {
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
};
