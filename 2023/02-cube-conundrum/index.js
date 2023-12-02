const maxCubes = {
	'red': 12,
	'green': 13,
	'blue': 14
};

function playGameOne(id, sets){
	let gameId = parseInt(id.replace(/\D+/g, ''));
	let gameSets = sets.split(';');
	let foundExceeding = false;

	// for each game set check for limits
	for (let i = 0; i < gameSets.length; i+=1) {
		let cubes = gameSets[i].split(',');

		let mapped = cubes.map(c => {
			if (c.includes('red')) { return parseInt(c) > maxCubes.red }
			if (c.includes('green')) { return parseInt(c) > maxCubes.green }
			if (c.includes('blue')) { return parseInt(c) > maxCubes.blue }
		});

		if(mapped.includes(true)) foundExceeding = true;
	}

	if(!foundExceeding) {
		return gameId;
	} else {
		return 0;
	}
}

function playGameTwo(_id, sets){
	let gameSets = sets.split(';');
	let gameMax = {
		red: 0,
		green: 0,
		blue: 0
	};

	// for each game get the max cubes per color and calculate the power of a set
	for (let i = 0; i < gameSets.length; i+=1) {
		let cubes = gameSets[i].split(',');

		cubes.forEach(c => {
			let n = parseInt(c);

			if (c.includes('red') && gameMax.red < n) gameMax.red = n;
			if (c.includes('green') && gameMax.green < n) gameMax.green = n;
			if (c.includes('blue') && gameMax.blue < n) gameMax.blue = n;
		});
	}

	return gameMax.red * gameMax.green * gameMax.blue;
}
async function partOne(rl) {
	let possibleGamesSum = 0;

  for await (const line of rl) {
	  possibleGamesSum += playGameOne(...line.split(':'));
	}

	console.log(possibleGamesSum);
}

async function partTwo(rl) {
	let sumOfPowers = 0;

	for await (const line of rl) {
		sumOfPowers += playGameTwo(...line.split(':'));
	}

	console.log(sumOfPowers);
}

module.exports = { partOne, partTwo };