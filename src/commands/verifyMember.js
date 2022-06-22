const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const getCharacterData = require('../utils/getCharacterInfo')


function generateResponse(type, data) {
	const description = {
		success: `O personagem ${data.name} foi verificado`,
		error: `A verificação do personagem ${data.name} falhou! Verifique se o nome está correto ou se o mesmo pertence à guild Harty Punt`
	}
	const embed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Verificação do personagem')
			.setDescription(description[type])
			.setFooter({ text: 'Criado por Vieirito Shinigami' });
	return embed
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('verificar')
		.setDescription('Faz a verificação do membro no servidor!'),
	async execute(interaction) {
		const characterToBeVerified = interaction.options.getString('name')
		const character = await getCharacterData(characterToBeVerified)
		if (character.guild.name === 'Harty Punt') {
			const response = await generateResponse('success', character)
			await interaction.reply({ embeds: [response] });
		} else {
			const response = await generateResponse('error', character)
			await interaction.reply({ embeds: [response] });
		}
	},
};