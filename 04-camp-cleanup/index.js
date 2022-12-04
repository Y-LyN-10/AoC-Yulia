async function partOne(rl) {
  let result = 0;

  for await (const line of rl) {
    let [p1, p2] = line.split(',');
    let [a,b,c,d] = p1.split('-').concat(p2.split('-')).map(Number);

    if ((a >= c && b <= d) || (c >= a && d <= b)) result +=1;
  }

  console.log(result);
}

async function partTwo(rl) {
  let result = 0;

  for await (const line of rl) {
    let [p1, p2] = line.split(',');
    let [a,b,c,d] = p1.split('-').concat(p2.split('-')).map(Number);

    if (!((a < c && b < c) || (a > d && b > d))) result += 1;
  }

  console.log(result);
}

module.exports = { partOne, partTwo };
