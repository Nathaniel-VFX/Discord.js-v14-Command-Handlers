const { ActivityType } = require('discord.js');
const client = require('..');
const chalk = require('chalk');

client.on("ready", () => {
	const activities = [
		{ name: `${client.guilds.cache.size} Servers`, type: ActivityType.Listening },
		{ name: `${client.channels.cache.size} Channels`, type: ActivityType.Playing },
		{ name: `${client.users.cache.size} Users`, type: ActivityType.Watching },
		{ name: `Discord.js v14`, type: ActivityType.Competing }
	];
	const status = [
		'online',
		'dnd',
		'idle'
	];
	let i = 0;
	setInterval(() => {
		if(i >= activities.length) i = 0
		client.user.setActivity(activities[i])
		i++;
	}, 5000);

	let s = 0;
	setInterval(() => {
		if(s >= activities.length) s = 0
		client.user.setStatus(status[s])
		s++;
	}, 30000);
	console.log(chalk.red(`Logged in as ${client.user.tag}!`))
});