// yep, hardcoded input again
const monkeys = [{
  items: [91, 54, 70, 61, 64, 64, 60, 85],
  operation: ((old) => old * 13),
  bigOperation: ((old) => BigInt(old) * 13n),
  divisor: 2,
  nextTrue: 5,
  nextFalse: 2,
  inspects: 0
}, {
  items: [82],
  operation: ((old) => old + 7),
  bigOperation: ((old) => BigInt(old) + 7n),
  divisor: 13,
  nextTrue: 4,
  nextFalse: 3,
  inspects: 0
}, {
items: [84,93,70],
  operation: ((old) => old + 2),
  bigOperation: ((old) => BigInt(old) + 2n),
  divisor: 5,
  nextTrue: 5,
  nextFalse: 1,
  inspects: 0
}, {
  items: [78,56,85,93],
  operation: ((old) => old * 2),
  bigOperation: ((old) => BigInt(old) * 2n),
  divisor: 3,
  nextTrue: 6,
  nextFalse: 7,
  inspects: 0
}, {
  items: [64, 57, 81, 95, 52, 71, 58],
  operation: ((old) => old * old),
  bigOperation: ((old) => BigInt(old * old)),
  divisor: 11,
  nextTrue: 7,
  nextFalse: 3,
  inspects: 0
}, {
  items: [ 58, 71, 96, 58, 68, 90],
  operation: ((old) => old + 6),
  bigOperation: ((old) => BigInt(old) + 6n),
  divisor: 17,
  nextTrue: 4,
  nextFalse: 1,
  inspects: 0
}, {
  items: [56, 99, 89, 97, 81],
  operation: ((old) => old + 1),
  bigOperation: ((old) => BigInt(old) + 1n),
  divisor: 7,
  nextTrue: 0,
  nextFalse: 2,
  inspects: 0
}, {
  items: [68, 72],
  operation: ((old) => old + 8),
  bigOperation: ((old) => BigInt(old) + 8n),
  divisor: 19,
  nextTrue: 6,
  nextFalse: 0,
  inspects: 0
}];

async function partOne(rl) {
  let rounds = 0;

  while(rounds < 20) {
    for (let m = 0; m < monkeys.length; m += 1) {
      for (let i = 0; i < monkeys[m].items.length; i += 1) {
        let worryLevel = Math.floor(monkeys[m].operation.call([], Number(monkeys[m].items[i])) / 3);
        if (worryLevel % monkeys[m].divisor === 0) {
          monkeys[monkeys[m].nextTrue].items.push(worryLevel);
        } else {
          monkeys[monkeys[m].nextFalse].items.push(worryLevel);
        }
      }
      monkeys[m].inspects += monkeys[m].items.length;
      monkeys[m].items = [];
    }
    rounds+=1;
  }

  let inspects = monkeys.map(m => m.inspects).sort((a,b) => b-a);
  let monkeyBusiness = inspects[0] * inspects[1];
  console.log(monkeyBusiness);
}

function calcMegaMod(monkeys) {
  return monkeys.reduce((v,c) => v * BigInt(c.divisor), 1n);
}

async function partTwo(rl) {
  let rounds = 0;
  let megaMod = calcMegaMod(monkeys);
  console.log(megaMod);

  while(rounds < 10000) {
    for (let m = 0; m < monkeys.length; m += 1) {
      for (let i = 0; i < monkeys[m].items.length; i += 1) {
        // reduce the item value without changing it's "divisible property"
        let item = BigInt(monkeys[m].items[i]) % megaMod;
        let worryLevel = BigInt(monkeys[m].bigOperation.call([], item));

        if (worryLevel % BigInt(monkeys[m].divisor) === 0n) {
          monkeys[monkeys[m].nextTrue].items.push(worryLevel);
        } else {
          monkeys[monkeys[m].nextFalse].items.push(worryLevel);
        }
      }
      monkeys[m].inspects += monkeys[m].items.length;
      monkeys[m].items = [];
    }
    rounds+=1;
  }

  let inspects = monkeys.map(m => m.inspects).sort((a,b) => b-a);
  let monkeyBusiness = inspects[0] * inspects[1];
  console.log(monkeyBusiness);
}

module.exports = { partOne, partTwo };
