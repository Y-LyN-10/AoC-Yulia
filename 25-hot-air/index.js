const snafuMap = {'-2': '=', '-1': '-', '0':'0', '1':'1', '2':'2'};
function integerToSnafu(number) {
  let n = number;
  let s = [];

  while(n > 0){
    let rem = ((2 + n) % 5) - 2;
    n -= rem;
    n = Math.floor(n/5);
    s.push(snafuMap[rem.toString()]);
  }

  return s.reverse().join('');
}

function snafuToInteger(snafu) {
  let sum = 0;
  snafu.split('').reverse().forEach((ch, i) => {
    let n;

    if(ch === '-'){
      n = -1;
    } else if(ch === '='){
      n = -2;
    } else {
      n = parseInt(ch);
    }

    n = n*(Math.pow(5,i));
    sum += n;
  });

  return sum;
}

async function partOne(rl) {
  let result = 0;

  for await (const line of rl) {
    let int = snafuToInteger(line);
    result += int;
  }

  // 27210103880867
  console.log(result);
  let snafu = integerToSnafu(result);
  //console.log('27210103880867');
  console.log(snafu);
}

async function partTwo(rl) {
  // There is no part 2 here
}

module.exports = { partOne, partTwo };
