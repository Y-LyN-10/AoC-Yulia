function getViewDistance(segment, h) {
  for(let i=0; i < segment.length; i+=1){
    if(segment[i] >= h) {
      return i+1;
    }
  }

  return segment.length;
}

async function partOne(rl) {
  let counter = 0;
  let forest = [];

  let row = 0;
  for await (const line of rl) {
    forest[row] = line.split('').map(Number);
    row+=1;
  }

  let w = forest[0].length;

  for(let i = 1; i < w-1; i += 1) {
    for(let j = 1; j < forest.length -1; j += 1) {
      let tree = forest[i][j];
      let column = [forest.map(row => row[j])][0];

      let leftSegment = forest[i].slice(0, j);
      let rightSegment = forest[i].slice(j+1);
      let topSegment = column.slice(0, i);
      let bottomSegment = column.slice(i+1);

      if ([Math.max(...leftSegment), Math.max(...rightSegment),
        Math.max(...topSegment), Math.max(...bottomSegment)].some(t => t < tree)) {
        counter += 1;
      }
    }
  }

  // add trees on the edge of the grid
  counter += w*2 + forest.length*2 - 4;
  console.log(counter);
}

async function partTwo(rl) {
  let forest = [];

  let row = 0;
  for await (const line of rl) {
    forest[row] = line.split('').map(Number);
    row+=1;
  }

  let w = forest[0].length;
  let maxScenicScore = 0;

  for(let i = 1; i < w-1; i += 1) {
    for(let j = 1; j < forest.length -1; j += 1) {
      let tree = forest[i][j];
      let scenicScore = 1;

      let column = [forest.map(row => row[j])][0];

      let leftSegment = forest[i].slice(0, j).reverse();
      let rightSegment = forest[i].slice(j+1);
      let topSegment = column.slice(0, i).reverse();
      let bottomSegment = column.slice(i+1);

      scenicScore = getViewDistance(leftSegment, tree)
        * getViewDistance(rightSegment, tree)
        * getViewDistance(topSegment, tree)
        * getViewDistance(bottomSegment, tree);

      if(scenicScore > maxScenicScore){
        maxScenicScore = scenicScore;
      }
    }
  }

  console.log(maxScenicScore);
}

module.exports = { partOne, partTwo };
