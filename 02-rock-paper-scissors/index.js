function isWin(a,b) {
    return ((b === 'X' && a === 'C') || (b === 'Y' && a === 'A') || (b === 'Z' && a === 'B'));
}

function isDraw(a,b) {
    return ((b === 'X' && a === 'A') || (b === 'Y' && a === 'B') || (b === 'Z' && a === 'C'));
}

module.exports = async function (rl) {
  let score = 0;
  const pointsMap = { 'X': 1, 'Y': 2, 'Z': 3};

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
};
