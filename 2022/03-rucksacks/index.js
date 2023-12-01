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
  let result = 0;
  let groupCount = 0;
  let gr = []; // group rucksacks

  for await (const line of rl) {
    groupCount += 1;

    if (groupCount <= 3) {
      gr.push(line);
    }

    if (groupCount === 3) {
      let commonItem = gr[0].split('').filter(item => ((gr[1].indexOf(item) > -1) && (gr[2].indexOf(item) > -1)))[0];
      result += alphabet.indexOf(commonItem);

      // reset counters
      groupCount = 0;
      gr = [];
    }
  }

  console.log(result);
}

module.exports = { partOne, partTwo };
