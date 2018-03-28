const bot = require('./bot.js');
const music = require('./music.js');
const player = require('./player.js');

let currentTrack;

music.init().then((url) => {
	player.playStream(url);
});

bot.on('play', (str) => {
	music.find(str).then(({url, track}) => {
		console.log(`[main] Now playing ${track.title} by ${track.artist}`);
		player.playStream(url);
		currentTrack = track;
	});
});

module.exports.info = function () {
	return {title, artist, durationMillis} = currentTrack;
};
