const { ApplicationCommandType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
	name: 'avatar',
	description: "Display user's avatar",
	type: ApplicationCommandType.ChatInput,
	cooldown: 3000,
    options: [
        {
            name: 'user',
            description: 'The avatar of the user you want to display.',
            type: ApplicationCommandOptionType.User
        }
    ],
	run: async (client, interaction) => {
        const user = interaction.options.get('user')?.user || interaction.user;

        const embed = new EmbedBuilder()
        .setTitle(`${user.tag}'s avatar`)
        .setImage(user.displayAvatarURL({ size: 4096 }))
        .setColor('Fuchsia')
        .setTimestamp();

        const formats = ['png', 'jpg', 'jpeg', 'gif'];
        const components = [];
        formats.forEach(format => {
            let imageOptions = { extension: format, forceStatic: format == 'gif' ? false : true };

            if (user.avatar == null && format !== 'png') return; 
            if (!user.avatar.startsWith('a_') && format === 'gif') return;
            components.push(
                new ButtonBuilder()
                .setLabel(format.toUpperCase())
                .setStyle('Link')
                .setURL(user.displayAvatarURL(imageOptions))
            )
        })

        const row = new ActionRowBuilder()
        .addComponents(components);

		return interaction.reply({ embeds: [embed], components: [row] })
	}
};
