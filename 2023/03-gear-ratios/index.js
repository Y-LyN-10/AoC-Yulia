async function partOne(rl) {
	let sum = 0;
	let validPartNumbers = [];
	let matrix = [];

	for await (const line of rl) {
		let row = line.split('');
		row.push('.'); // hack to avoid the edge cases
		matrix.push(row);
	}

	let checkedMatrix = matrix.map(function(arr) {
		return arr.slice();
	});

	// console.log(matrix);

	let DEBUG_ROW = 7;

	for(let i = 0; i < matrix.length; i+=1) {
		let partNumber = '';
		if(i === DEBUG_ROW) console.log('watch this line');
		for(let j = 0; j < matrix[i].length; j+=1){
			if(i === DEBUG_ROW) console.log('walk', matrix[i][j]);

			// find a number
			if(!isNaN(matrix[i][j])) {
				partNumber = partNumber + matrix[i][j];
				checkedMatrix[i][j] = 'N';
			} else {

			// if there is no number yet, continue
				if (partNumber === '') continue;

				// if a symbol, then there is no need to check all coords
				if(matrix[i][j] !== '.') {
					validPartNumbers.push(parseInt(partNumber));
					partNumber = '';
					checkedMatrix[i][j] = 'T';
					continue;
				}

				// check column before the number
				if (partNumber.length < j){
					// line above
					if ((i > 0) && (matrix[i-1][j - partNumber.length - 1] !== '.') && isNaN(matrix[i-1][j - partNumber.length - 1])) {
						validPartNumbers.push(parseInt(partNumber));
						partNumber = '';
						checkedMatrix[i-1][j - partNumber.length - 1] = 'T';
						continue;
					}

					// same line before number
					if(i === 0) console.log('before', matrix[i][j - partNumber.length - 1]);
					if (matrix[i][j - 1 - partNumber.length] !== '.' && isNaN(matrix[i][j - 1 - partNumber.length])) {
						validPartNumbers.push(parseInt(partNumber));
						partNumber = '';
						checkedMatrix[i][j - partNumber.length - 1] = 'T';
						continue;
					}

					// bottom line
					if ((i < matrix.length - 1) && (matrix[i+1][j - partNumber.length - 1] !== '.') && isNaN(matrix[i+1][j - partNumber.length - 1])) {
						validPartNumbers.push(parseInt(partNumber));
						partNumber = '';
						checkedMatrix[i+1][j - partNumber.length - 1] = 'T';
						continue;
					}
				}

				if(i === DEBUG_ROW) console.log({partNumber, j})

				// above
				if (i > 0) {
					for(let p = 0; p <= partNumber.length; p+=1) {
						if ((matrix[i-1][j - p] !== '.') && isNaN(matrix[i-1][j - p])) {
							if(i === DEBUG_ROW) console.log('above', matrix[i-1][j-p]);
							validPartNumbers.push(parseInt(partNumber));
							partNumber = '';
							checkedMatrix[i-1][j - p] = 'T';
							break;
						}
					}
				}

				// below + down right diagonal
				if (i < matrix.length - 1) {
					for(let p = 0; p <= partNumber.length; p+=1) {
						if ((matrix[i+1][j-p] !== '.') && isNaN(matrix[i+1][j-p])) {
							if(i === DEBUG_ROW) console.log('below', matrix[i+1][j-p]);
							validPartNumbers.push(parseInt(partNumber));
							partNumber = '';
							checkedMatrix[i+1][j - p] = 'T';
							break;
						}
					}
				}

				// reset the number at the end
				partNumber = '';
			}
		}
	}

	// console.log(checkedMatrix.map(l=> l.join('')));
	console.log(validPartNumbers.filter(Boolean));
	console.log(validPartNumbers.filter(Boolean).map(Number).reduce((partialSum, a) => partialSum + a, 0));
}

async function partTwo(rl) {
	let res = 0;

	for await (const line of rl) {

	}

	console.log(res);
}

module.exports = { partOne, partTwo };