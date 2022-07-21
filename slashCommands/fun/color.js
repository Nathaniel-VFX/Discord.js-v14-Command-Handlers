const { ApplicationCommandType, ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	name: 'color',
	description: "Choose a color!",
	type: ApplicationCommandType.ChatInput,
	cooldown: 3000,
	run: async (client, interaction) => {
        /** Get the buttons
         * @param {Boolean} toggle - Toggle disable buttons
         * @param {string} [choice = null] choice - The color user chose
         */
        const getButtons = (toggle = false, choice) => {
            const row = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                        .setLabel('Green')
                        .setCustomId('green')
                        .setStyle(toggle == true && choice == 'green' ? 'Secondary' : 'Success')
                        .setDisabled(toggle),
    
                    new ButtonBuilder()
                        .setLabel('Red')
                        .setCustomId('red')
                        .setStyle(toggle == true && choice == 'red' ? 'Secondary' : 'Danger')
                        .setDisabled(toggle),
    
                    new ButtonBuilder()
                        .setLabel('Blue')
                        .setCustomId('blue')
                        .setStyle(toggle == true && choice == 'blue' ? 'Secondary' : 'Primary')
                        .setDisabled(toggle),
    
                    new ButtonBuilder()
                        .setLabel(toggle == true && choice == 'exit' ? 'Exited' : 'Exit')
                        .setEmoji(toggle == true && choice == 'exit' ? '✅' : '❌')
                        .setCustomId('exit')
                        .setStyle(toggle == true && choice == 'exit' ? 'Danger' : 'Secondary')
                        .setDisabled(toggle)
            );

            return row;
        }

        const embed = new EmbedBuilder()
        .setTitle('Choose a color')
        .setDescription('Choose green, red or blue.\nIf you don\'t want to choose, press exit.')
        .setColor('Aqua')
        .setFooter({ text: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() });

        interaction.reply({ embeds: [embed], components: [getButtons()] })
        .then((m) => {
            const collector = m.createMessageComponentCollector({ time: 15000 });

            collector.on('collect', async (i) => {
                if (!i.isButton()) return;

                await i.deferUpdate();
                if (i.user.id !== interaction.user.id) return i.followUp({ content: `These buttons aren't for you!`, ephemeral: true });

                m.interaction.editReply({ components: [getButtons(true, i.customId)] })
                if(i.customId === 'exit') return collector.stop();

                return i.followUp(`${i.user}, You chose **${i.customId.charAt(0).toUpperCase() + i.customId.slice(1)} :${i.customId}_circle:**!`);
            });
            
            collector.on('end', (collected, reason) => {
                if (reason === 'user') {
                    return interaction.followUp({ content: 'Ended the collector.', ephemeral: true });
                }
                if(reason === 'time') {
                    return;
                }
            });

        });
	}
};
