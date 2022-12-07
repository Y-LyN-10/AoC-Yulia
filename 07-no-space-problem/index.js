const path = require('path');

async function dirtyParseAndBuild(rl) {
  const dirs = {};
  let currentPath = '/';

  for await (const line of rl) {
    if (line.startsWith('$ cd')){
      let dirName = line.split('$ cd')[1].trim();
      currentPath += dirName + '/';
      currentPath = path.normalize(currentPath);

      if(!dirs[currentPath]) dirs[currentPath] = [];
    } else if (!line.startsWith('$ ls') && !line.startsWith('dir')){
      let size = line.split(' ')[0];
      dirs[currentPath].push(parseInt(size));
    }
  }

  return dirs;
}

function dirtySums(dirs){
  // add file sizes to top levels
  Object.keys(dirs).forEach(dir => {
    let pathParts = dir.split('/').filter(Boolean);
    let upperDir = '/';
    for(let i = 0; i < pathParts.length; i += 1) {
      dirs[upperDir].push(...dirs[dir]);
      upperDir += pathParts[i] + '/';
    }
  });

  return dirs;
}

async function partOne(rl) {
  const dirs = dirtySums(await dirtyParseAndBuild(rl));

  // We don't care for dir names and paths anymore
  const dirSums = Object.keys(dirs).map(dir => {
    return dirs[dir].reduce((partialSum, a) => partialSum + a, 0);
  });

  let result = dirSums.filter((s) => s < 100000).reduce((partialSum, a) => partialSum + a, 0);

  console.log(result);
}

async function partTwo(rl) {
  const totalSpace = 70000000;
  const needSpace = 30000000;

  const dirs = await dirtyParseAndBuild(rl);
  const allocatedSpace = dirs['/'].reduce((partialSum, a) => partialSum + a, 0);

  // FIXME: something messed up here
  let availSpace = totalSpace - allocatedSpace;
  let removeSpace = needSpace - availSpace;

  const dirSums = Object.keys(dirs).map(dir => {
    return dirs[dir].reduce((partialSum, a) => partialSum + a, 0);
  });

  dirSums.sort((a, b) => a - b);
  for(let i = 0; i <= dirSums.length; i+=1){
    if (dirSums[i] >= removeSpace){
      console.log(dirSums[i]);
      return;
    }
  }
}

module.exports = { partOne, partTwo };
