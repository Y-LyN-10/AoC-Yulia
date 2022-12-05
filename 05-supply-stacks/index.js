// I modified the input 'cause I'm lazy to parse it.
// The stacks are hardcoded and we parse only the moves

const originalStacks = [
  ['G', 'F', 'V', 'H', 'P', 'S'],
  ['G', 'J', 'F', 'B', 'V', 'D', 'Z', 'M'],
  ['G', 'M', 'L', 'J', 'N'],
  ['N', 'G', 'Z', 'V', 'D', 'W', 'P'],
  ['V', 'R', 'C', 'B'],
  ['V', 'R', 'S', 'M', 'P', 'W', 'L', 'Z'],
  ['T', 'H', 'P'],
  ['Q', 'R', 'S', 'N', 'C', 'H', 'Z', 'V'],
  ['F', 'L', 'G', 'P', 'V', 'Q', 'J']
];

function getTopCrates(stacks) {
  return stacks.map(stack => stack[stack.length-1]).join('');
}

async function partOne(rl) {
  const stacks = originalStacks.map(stack => stack.slice()); // yep, ugly copy

  for await (const line of rl) {
    let [n, i, j] = line.match(/(\d|,)+/g).map(Number);
    for (let m = 0; m < n; m +=1) {
      stacks[j-1].push(stacks[i-1].pop());
    }
  }

  console.log(getTopCrates(stacks));
}

async function partTwo(rl) {
  const stacks = originalStacks.map(stack => stack.slice());

  for await (const line of rl) {
    let [n, i, j] = line.match(/(\d|,)+/g).map(Number);
    stacks[j-1].push(...stacks[i-1].splice(stacks[i-1].length - n, n));
  }

  console.log(getTopCrates(stacks));
}

module.exports = { partOne, partTwo };
