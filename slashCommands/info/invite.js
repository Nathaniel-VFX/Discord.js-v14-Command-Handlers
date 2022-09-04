const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ApplicationCommandType, ButtonStyle } = require('discord.js');



module.exports = {
	name: 'invite',
	description: "Get the bot's invite link",
	cooldown: 3000,
	run: async (client, interaction) => {
    servers = client.guilds.cache.size
		const inviteUrl = `https://discord.com/api/oauth2/authorize?client_id=${process.env.CLIENT_ID}&permissions=8&redirect_uri=https%3A%2F%2Fdiscord.com&response_type=code&scope=bot%20identify%20guilds%20guilds.join%20guilds.members.read%20applications.commands%20messages.read`;
		const embed = new EmbedBuilder()
		.setTitle('Invite me')
		.setDescription(`I am in **${servers}** servers, lets grow that number\nInvite the bot to your server. [Click here](${inviteUrl})`)
		.setColor('Orange')
		.setTimestamp()
		.setThumbnail(client.user.displayAvatarURL())
		.setFooter({text: "Requested by "+interaction.user.tag })

		const actionRow = new ActionRowBuilder()
		.addComponents([
			new ButtonBuilder()
			.setLabel('Invite')
			.setURL(inviteUrl)
			.setStyle(ButtonStyle.Link)
		])
		return interaction.reply({ embeds: [embed], components: [actionRow] })
	}
};
