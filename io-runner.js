// Reusable file for tasks I/O so that I don't write input parser each time.

const fs = require('fs');
const readline = require('readline');
const path = require('path');
const solutionDir = process.argv[2];
const solve = require(path.resolve(solutionDir));

// Usage from the root dir: node io-runner.js {directory-name}
// Example: node io-runner.js 01-1_calories

async function processLineByLine() {
  const fileStream = fs.createReadStream(path.resolve(solutionDir,'input.txt'));

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  solve(rl);
}

processLineByLine();
