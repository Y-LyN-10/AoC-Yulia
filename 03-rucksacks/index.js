const alphabet = [,
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
  'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
  'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
];

async function partOne(rl) {
  let result = 0;

  for await (const line of rl) {
    let compSize = line.length / 2;
    let comp1 = line.slice(0, compSize);
    let comp2 = line.slice(compSize, line.length);

    let commonItem = comp1.split('').filter(item => comp2.indexOf(item) > -1)[0];
    result += alphabet.indexOf(commonItem);
  }

  console.log(result);
}

async function partTwo(rl) {
  for await (const line of rl) {

  }
}

module.exports = { partOne, partTwo };
