const { ApplicationCommandType, EmbedBuilder } = require('discord.js');
// contribution by D99-1 on github

module.exports = {
	name: 'uptime',
	description: "Check the bot's latest uptime",
	type: ApplicationCommandType.ChatInput,
	cooldown: 3000,
	run: async (client, interaction) => {
		let totalSeconds = (client.uptime / 1000);
let hours = Math.floor(totalSeconds / 3600);
totalSeconds %= 3600;
let minutes = Math.floor(totalSeconds / 60);
let seconds = Math.floor(totalSeconds % 60);
    let uptime = `**${hours}** hours, **${minutes}** minutes and **${seconds}** seconds`;
let embed = new EmbedBuilder()
      .setTitle('{Bot_Name} Bot Uptime')
      .setDescription(`${uptime}`)
      .setColor("Orange")
      .setFooter({text: "Requested by "+ interaction.user.tag})
      .setTimestamp()

			return interaction.reply({ embeds: [embed]})
    
	}
};
