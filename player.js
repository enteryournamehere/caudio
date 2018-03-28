const { Client, DefaultMediaReceiver } = require('castv2-client');
const client = new Client();
const secure = require('./secure.json');

let gPlayer;

new Promise((resolve, reject) => {
	client.connect(secure.chromecast.ip, () => resolve());
}).then(() => {
	client.launch(DefaultMediaReceiver, (e, player) => {
		playerReady = true;
		gPlayer = player;
	});
});

module.exports.playStream = (url) => {
	gPlayer.load({
		streamType: 'LIVE',
		contentId: url,
		contentType: 'audio/wav',
	}, {
		autoplay: true,
	}, (e, s) => {
		console.log('[player] Stream started');
	});
};