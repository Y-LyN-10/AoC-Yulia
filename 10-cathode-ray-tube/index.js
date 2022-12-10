const sumPoint = [20,60,100,140,180,220];

async function partOne(rl) {
  let x = 1;
  let cycle = 0;
  let sum = 0;

  for await (const line of rl) {
    cycle += 1;

    if(sumPoint.indexOf(cycle) > -1){
      sum += (cycle * x);
    }

    if(line !== 'noop') {
      let v = parseInt(line.split(' ')[1]);
      cycle += 1;

      if(sumPoint.indexOf(cycle) > -1){
        sum += (cycle * x);
      }

      x += v;
    }
  }

  console.log(sum);
}

async function partTwo(rl) {
  let x = 1;
  let cycle = 0;
  let sprite = new Array(6).fill().map(_ => new Array(40).fill('.'));

  for await (const line of rl) {
    if(Math.abs(x - cycle % 40) <= 1) {
      sprite[Math.floor(cycle / 40)][cycle % 40] = '#';
    }
    cycle += 1;
    if(Math.abs(x - cycle % 40) <= 1) {
      sprite[Math.floor(cycle / 40)][cycle % 40] = '#';
    }

    if(line !== 'noop') {
      let v = parseInt(line.split(' ')[1]);
      cycle += 1;
      x += v;
    }
  }

  for(let row in sprite){
    console.log(sprite[row].join(' '));
  }
}

module.exports = { partOne, partTwo };
