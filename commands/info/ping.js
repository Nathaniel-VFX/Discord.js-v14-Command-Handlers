module.exports = {
	name: 'ping',
	description: "Check bot's ping.",
	cooldown: 3000,
	userPerms: [],
	botPerms: [],
	run: async (client, message, args) => {
		const msg = await message.reply('Pinging...')
		await msg.edit(`Pong! **${client.ws.ping} ms**`)
	}
};