async function partOne(rl) {
  for await (const line of rl) {
    let buff = '';

    for(let i = 0; i < line.length; i++){
      let repIndex = buff.indexOf(line[i]);
      if (repIndex > -1) {
        buff = buff.slice(repIndex+1, buff.length);
      }

      buff += line[i];

      if (buff.length === 4) {
        console.log(i+1);
        return;
      }
    }
  }
}

async function partTwo(rl) {
  for await (const line of rl) {
    let buff = '';

    for (let i = 0; i < line.length; i++) {
      let repIndex = buff.indexOf(line[i]);
      if (repIndex > -1) {
        buff = buff.slice(repIndex+1, buff.length);
      }

      buff += line[i];

      if (buff.length === 14) {
        console.log(i + 1);
        return;
      }
    }
  }
}

module.exports = { partOne, partTwo };
