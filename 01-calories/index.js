async function countCalories(rl) {
  const caloriesPerElf = [];
  let i = 0;
  caloriesPerElf[i] = 0;

  for await (const line of rl) {
    let calories = parseInt(line);
    if(Number.isNaN(calories)){
      i+=1;
      caloriesPerElf[i] = 0;
    } else {
      caloriesPerElf[i] += calories;
    }
  }

  return caloriesPerElf;
}

async function partOne(rl) {
  const caloriesPerElf = await countCalories(rl);
  console.log(Math.max(...caloriesPerElf));
};

async function partTwo(rl) {
  const caloriesPerElf = await countCalories(rl);
  caloriesPerElf.sort((a,b) => b-a);
  console.log(caloriesPerElf[0] + caloriesPerElf[1] + caloriesPerElf[2]);
};

module.exports = { partOne, partTwo };
