crypRandom = require('crypto');

var randKey = function() {
	return crypRandom.randomBytes(4).toString('hex');
}

//TODO: Phonetic Random KeyGen



exports.randKey = randKey;
