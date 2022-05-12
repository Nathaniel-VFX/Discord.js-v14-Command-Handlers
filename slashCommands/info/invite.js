const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');

module.exports = {
	name: 'invite',
	description: "Get the bot's invite link",
	cooldown: 3000,
	userPerms: ['Administrator'],
	run: async (client, interaction) => {
		const embed = new EmbedBuilder()
		.setTitle('Invite me')
		.setDescription('Invite the bot to your server. [Click here](https://discord.com/api/oauth2/authorize?client_id=956880462767341598&permissions=8&scope=bot%20applications.commands)')
		.setColor('#03fcdb')
		.setTimestamp()
		.setThumbnail(client.user.displayAvatarURL())
		.setFooter({ text: client.user.tag })

		const actionRow = new ActionRowBuilder()
		.addComponents([
			new ButtonBuilder()
			.setLabel('Invite')
			.setURL('https://discord.com/api/oauth2/authorize?client_id=956880462767341598&permissions=8&scope=bot%20applications.commands')
			.setStyle(5)
		])
		interaction.reply({ embeds: [embed], components: [actionRow] })
	}
};
