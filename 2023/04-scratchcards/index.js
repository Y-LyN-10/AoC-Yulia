function countMatchingNumbers(w, n){
	const count = n.reduce((acc, cur) => w.includes(cur)
		? Object.assign(acc, {n: acc.n + 1})
		: Object.assign(acc, {res: acc.res.concat(cur)}), { n: 0, res: []});

	return count.n;
}

async function partOne(rl) {
	let sum = 0;

	for await (const line of rl) {
		let cardNumbers = line.split(':')[1];
		let [l, r] = cardNumbers.split('|');
		let winningNumbers = l.split(' ').filter(Boolean).map(Number);
		let numbers = r.split(' ').filter(Boolean).map(Number);

		let matches = countMatchingNumbers(winningNumbers, numbers);
		if(matches <= 2) { sum += matches } else {
			sum += Math.pow(2, matches - 1);
		}
	}

	console.log(sum);
}

async function partTwo(rl) {
	let originalCards = {};
	let extraCards = [];
	let processedCards = [];

	for await (const line of rl) {
		let [cardId, cardNumbers] = line.split(':');
		let CN = parseInt(cardId.replace(/\D+/g, ''));
		processedCards.push(CN);

		let [l, r] = cardNumbers.split('|');
		let winningNumbers = l.split(' ').filter(Boolean).map(Number);
		let numbers = r.split(' ').filter(Boolean).map(Number);

		let matches = countMatchingNumbers(winningNumbers, numbers);
		originalCards[CN] = matches;
		if (matches > 0) {
			extraCards.push(...new Array(matches).fill(0).map((x, i) => CN + 1 + i));
		}
	}

	console.log(originalCards);
	extraCards.sort((a, b) => a - b);

	let sum = Object.keys(originalCards).length;

	// process extra cards
	while(extraCards.length > 0) {
		let c = extraCards.shift();
		sum += 1;
		if (originalCards[c] > 0) {
			extraCards.push(...new Array(originalCards[c]).fill(0).map((x, i) => c + 1 + i));
		}
		console.log(sum);
	}

	console.log(sum);
}

module.exports = { partOne, partTwo };