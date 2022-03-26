const client = require('..')
const { EmbedBuilder, Collection, PermissionsBitField } = require('discord.js')
const cooldown = new Collection()
const ms = require('ms')

client.on('interactionCreate', async interaction => {
		if (!interaction.isCommand()) return;
		const slashCommand = client.slashCommands.get(interaction.commandName);
		if(!slashCommand) return client.slashCommands.delete(interaction.commandName);
		try {
			if(slashCommand.cooldown) {
				if(cooldown.has(`slash-${slashCommand.name}${interaction.user.id}`)) return interaction.reply({ content: `You are on \`${ms(cooldown.get(`slash-${slashCommand.name}${interaction.user.id}`) - Date.now(), {long : true})}\` cooldown!`})

				if(slashCommand.userPerms || slashCommand.botPerms) {
					if(!interaction.member.permissions.has(PermissionsBitField.Flags[slashCommand.userPerms] || [])) {
						const userPerms = new EmbedBuilder()
						.setDescription(`🚫 ${interaction.user}, You don't have \`${slashCommand.userPerms}\` permissions to use this command!`)
						.setColor('Red')
						return interaction.reply({ embeds: [userPerms] })
					}
					if(!interaction.guild.me.permissions.has(slashCommand.botPerms || [])) {
						const botPerms = new EmbedBuilder()
						.setDescription(`🚫 ${interaction.user}, I don't have \`${slashCommand.userPerms}\` permissions to use this command!`)
						.setColor('Red')
						return interaction.reply({ embeds: [botPerms] })
					}
				}

					await slashCommand.run(client, interaction);
					cooldown.set(`slash-${slashCommand.name}${interaction.user.id}`, Date.now() + slashCommand.cooldown)
					setTimeout(() => {
							cooldown.delete(`slash-${slashCommand.name}${interaction.user.id}`)
					}, slashCommand.cooldown)
			} else {
				if(slashCommand.userPerms || slashCommand.botPerms) {
					if(!interaction.member.permissions.has(PermissionsBitField.Flags[slashCommand.userPerms] || [])) {
						const userPerms = new EmbedBuilder()
						.setDescription(`🚫 ${interaction.user}, You don't have \`${slashCommand.userPerms}\` permissions to use this command!`)
						.setColor('Red')
						return interaction.reply({ embeds: [userPerms] })
					}
					if(!interaction.guild.me.permissions.has(slashCommand.botPerms || [])) {
						const botPerms = new EmbedBuilder()
						.setDescription(`🚫 ${interaction.user}, I don't have \`${slashCommand.userPerms}\` permissions to use this command!`)
						.setColor('Red')
						return interaction.reply({ embeds: [botPerms] })
					}
				}
					await slashCommand.run(client, interaction);
			}
		} catch (error) {
				console.log(error);
		}
});