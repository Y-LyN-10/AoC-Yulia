function isAdjacent(head, tail){
  return (Math.abs(head.i - tail.i) === Math.abs(head.j - tail.j))
      || (Math.abs(head.i - tail.i) + Math.abs(head.j - tail.j)) < 2;
}

const moves = {'R': [0, 1], 'U': [-1, 0], 'L': [0, -1], 'D': [1, 0]};

async function partOne(rl) {
  // I don't wanna deal with dynamically changing dimensions. This is big enough :D
  const grid = new Array(2000).fill(null).map(() => new Array(2000).fill('.'));

  // initial head and tail positions - somewhere in the middle would suffice
  let hp = { i: grid.length/2, j: grid.length/2 };
  let tp = { i: grid.length/2, j: grid.length/2 };

  for await (const line of rl) {
    let [direction, steps] = line.split(' ');
    steps = parseInt(steps);

    for(let i = 0; i < steps; i += 1){
      // move head
      hp.i += moves[direction][0];
      hp.j += moves[direction][1];

      // move tail
      if(!isAdjacent(hp, tp)){
        tp.j = hp.j - moves[direction][1];
        tp.i = hp.i - moves[direction][0];
        grid[tp.i][tp.j] = '#';
      }
    }
  }

  let visited = 0;
  for(let row in grid){
    for(let i = 0; i< grid[row].length; i += 1){
      if(grid[row][i] === '#') { visited +=1 };
    }
  }

  console.log(visited);
}

async function partTwo(rl) {
  let result = 0;

  for await (const line of rl) {
    // will solve some other day
  }

  console.log(result);
}

module.exports = { partOne, partTwo };
