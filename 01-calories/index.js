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

  // Part 1
  // Find the Elf carrying the most Calories. How many total Calories is that Elf carrying?
  // console.log(Math.max(...caloriesPerElf));

  // Part 2
  //  Find the top three Elves carrying the most Calories. How many Calories are those Elves carrying in total?
  caloriesPerElf.sort((a,b) => b-a);
  console.log(caloriesPerElf[0] + caloriesPerElf[1] + caloriesPerElf[2]);
};
