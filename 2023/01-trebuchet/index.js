function getCalibrationValue(digits){
	return parseInt((digits[0] + digits.at(-1)));
}

function wordsToDigits(str) {
	let words = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

	// find firstDigit Index
	let firstDigit = '';
	let firstWordDigit = '';
	let firstDigitIndex;
	let firstWordDigitIndex;
	let substr = '';
	for(let i = 0; i <= str.length; i+=1) {
		substr+= str[i];

		if(words.some(w => substr.includes(w))) {
			let wordDigit = words.map(w => { if(substr.indexOf(w) > -1) return w }).filter(Boolean)[0];
			firstWordDigit = words.indexOf(wordDigit);
			firstWordDigitIndex = i - substr.length;
			break;
		}

		if(!isNaN(str[i])) {
			firstDigit = str[i];
			firstDigitIndex = i;

			break;
		}
	}

	// find lastDigit Index
	let lastDigit = '';
	let lastWordDigit = '';
	let lastDigitIndex;
	let lastWordDigitIndex;
	substr = '';
	for(let i = str.length; i > 0; i-=1) {
		substr = str[i] + substr;

		if(words.some(w => substr.includes(w))) {
			let wordDigit = words.map(w => { if(substr.indexOf(w) > -1) return w }).filter(Boolean)[0];
			lastWordDigit = words.indexOf(wordDigit);
			lastWordDigitIndex = i;
			break;
		}

		if(!isNaN(str[i])) {
			lastDigit = str[i];
			lastDigitIndex = i;

			break;
		}
	}

	return '' + firstDigit + firstWordDigit + lastDigit + lastWordDigit;

}

async function partOne(rl) {
	let vals = [];

	for await (const line of rl) {
		let digits = line.replace(/\D+/g, '');
		vals.push(getCalibrationValue(digits));
	}

	console.log(vals.reduce((partialSum, a) => partialSum + a, 0));
}

async function partTwo(rl) {
	let vals = [];

	for await (const line of rl) {
		let fixedInput = wordsToDigits(line);
		let digits = fixedInput.replace(/\D+/g, '');
		vals.push(getCalibrationValue(digits));
	}

	console.log(vals.reduce((partialSum, a) => partialSum + a, 0));
}

module.exports = { partOne, partTwo };