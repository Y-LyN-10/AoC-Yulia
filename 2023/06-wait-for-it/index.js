// hardcode the input this time

const races = [
	{time: 53897698, distance: 313109012141201},
	// {time: 89, distance: 1090},
	// {time: 76, distance: 1214},
	// {time: 98, distance: 1201}
];

async function partOne(rl) {
	let result = 1;

	for(let i = 0; i < races.length; i +=1){
		let raceWins = 0;
	  for(let x = 1; x < races[i].time; x += 1){
		  // travelled distance = time left * acceleration
		  let ms = x * ((races[i].time) - x);
			if(ms > races[i].distance) {
				raceWins += 1;
			}
	  }
		result *= raceWins;
	}

	console.log(result);
}

async function partTwo(rl) {

}

module.exports = { partOne, partTwo };