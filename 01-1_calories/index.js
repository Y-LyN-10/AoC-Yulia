module.exports = async function (rl) {
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

  console.log(Math.max(...caloriesPerElf));
};
