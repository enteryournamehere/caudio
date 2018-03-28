let PlayMusic = require('playmusic');
const secure = require('./secure.json');
let pm = new PlayMusic();

module.exports.init = () => {
	return new Promise((resolve, reject) => {
		pm.init({email: secure.google.username, password: secure.google.password}, function (err) {
			if (err) console.error(err);
			pm.getAllTracks(function (err, library) {
				let song = library.data.items.pop();
				pm.getStreamUrl(song.id, function (err, streamUrl) {
					console.log('[music] Stream URL: ' + streamUrl);
					resolve(streamUrl);
				});
			});
		});
	});
};

module.exports.find = (term) => {
	return new Promise((resolve, reject) => {
		pm.search(term, 20, function (err, data) {
			let song = data.entries.filter(function (x) {
				return x.type == 1;
			}).sort((a, b) => {
				return a.score > b.score;
			});
			song = song[1] || song[0]; // often the first result isnt actually the best one, will figure this out later
			pm.getStreamUrl(song.track.storeId, (err, streamUrl) => {
				resolve({url: streamUrl, track: song.track});
			});
		}, '1');
	});
};
