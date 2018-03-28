const EventEmitter = require('events');
const Discord = require('discord.js');
const secure = require('./secure.json');
const main = require('./main.js');

let emitter = new EventEmitter();
module.exports = emitter;

const Musi = new Discord.Client({
	disableEveryone: true,
});

Musi.on('ready', () => {
	console.log('[bot] Connected to Discord');
	Musi.fetchUser(secure.discord.owner).then((user) => {
		user.send('Connected');
	});
});

Musi.on('message', (message) => {
	if (message.author.bot || !message.content) return;
	let commandAttempt = message.content.indexOf(secure.prefix) === 0;
	if (!commandAttempt) return;
	let commandName = message.content.replace(secure.prefix, '').split(/\s+/)[0].toLowerCase();
	let argument = message.content.split(/\s(.+)/)[1];
	if (commandName === 'play') {
		emitter.emit('play', argument);
	}
	if (commandName === 'play2') {
		emitter.emit('play2', argument);
	}
	if (commandName === 'info') {
		let info = main.info();
		let durationSeconds = info.durationMillis / 1000;
		let fancyDuration = Math.floor(durationSeconds / 60) + ':' + Math.round(durationSeconds % 60).toString().padStart(2, '0');
		message.channel.send(`Now playing ${info.title} by ${info.artist}. Duration: ${fancyDuration}`);
	}
});

Musi.on('error', (error) => {
	console.log('Error! ' + error.message);
});

Musi.login(secure.discord.token);
