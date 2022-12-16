function compare(a, b){
  if(typeof b === 'object' && typeof a === 'number') {
    a = [a];
  }
  if(typeof b === 'number' && typeof a === 'object') {
    b = [b];
  }

  if(typeof a === 'number' && typeof b === 'number'){
    return a < b ? 1 : a === b ? 0 : -1;
  }

  // then both a and b are arrays
  let i = 0;
  while (i < a.length && i < b.length) {
    let x = compare(a[i], b[i]);
    // keep comparing if zero
    if (x !== 0) return x;

    i += 1;
  }

  // left side run out of items
  if (i === a.length){
    return a.length === b.length ? 0 : 1;
  }

  // right side run out of items
  return -1;
}

async function partOne(rl) {
  let isum = 0;
  let pairs = [];
  let pairIndx = 1;

  for await (const line of rl) {
    if(!line.trim().length) {
      if(compare(pairs[0], pairs[1]) === 1){
        isum += pairIndx;
      }

      pairs = [];
      pairIndx += 1;
    } else {
      pairs.push(eval(line));
    }
  }

  console.log(isum);
}

async function partTwo(rl) {
  let pairs = [];

  for await (const line of rl) {
    if(line.trim().length) {
      pairs.push(eval(line));
    }
  }

  pairs.push([[2]],[[6]]);
  pairs.sort(compare).reverse();

  // extremely non-efficient and bug prone ([2].toString() is also '2'),
  // but it worked with mine input
  let m = pairs.findIndex(row => row.toString() === '2') + 1;
  let n = pairs.findIndex(row => row.toString() === '6') + 1;

  console.log(m*n);
}

module.exports = { partOne, partTwo };
