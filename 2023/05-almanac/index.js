
function getMinLocation(inventory, input) {
	let almanac = {};
	let currentMap = '';
	for(let i = 1; i < input.length; i+=1){
		if(input[i].includes('map')) {
			currentMap = input[i].split(' ')[0]; // e.g "soil-to-fertilizer"
			almanac[currentMap] = [];
		} else {
			// destination, source and range length
			let [dest, src, rl] = input[i].split(' ').map(Number);
			almanac[currentMap].push({dest, src, rl});
		}
	}

	// Let's start the great mapping
	Object.keys(almanac).forEach(map => {
		let [from, to] = map.split('-to-');

		// copy original numbers, map only matches
		inventory[to] = [...inventory[from]];

		for (let i = 0; i < almanac[map].length; i+=1) {
			let {dest, src, rl} = almanac[map][i];
			let modifier = dest - src;

			// replace destination numbers if matches found
			for(let j = 0; j < inventory[from].length; j+=1){
				if((inventory[from][j] > src) && (inventory[from][j] < (src + rl))) {
					inventory[to][j] = inventory[to][j] + modifier;
				}
			}
		}
	});

	return Math.min(...inventory.location);
}
async function partOne(rl) {
	// let input = [];

	// read the entire input, parse it later
	// for await (const line of rl) if(line) input.push(line);

	// parse input to js map object
	// let inventory = { 'seed': input[0].split(':')[1].split(' ').filter(Boolean).map(Number) };

	// console.log(getMinLocation(inventory, input));
}

async function partTwo(rl) {
	let input = [];

	// read the entire input, parse it later
	for await (const line of rl) if(line) input.push(line);

	// parse input to js map object
	let initialSeedsInput = input[0].split(':')[1].split(' ').filter(Boolean).map(Number);
  let inventory = { 'seed': [] };

	// now every second number is not a seed number but range
	for(let i = 0; i < initialSeedsInput.length-1; i += 2) {
		inventory['seed'].push(...arrayRange(initialSeedsInput[i], initialSeedsInput[i+1]));
	}

	console.log(inventory.seed);
	console.log(getMinLocation(inventory, input));
}

const arrayRange = (start, step) =>
	Array.from(
		{ length: step },
		(value, index) => start + index
	);
module.exports = { partOne, partTwo };