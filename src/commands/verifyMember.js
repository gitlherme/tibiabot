const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const getCharacterData = require('../utils/getCharacterInfo')

function generateResponse(type, data) {
	const description = {
		success: `Tudo certo! Verifique se possui o acesso completo ao Discord. 🥳`,
		error: `Ops! Parece que esse personagem não existe ou não faz parte da Guild. 😵`
	}

	const embed = new MessageEmbed()
		.setTitle('Verificação do personagem')
		.setDescription(description[type])
		.setFooter({ text: 'Criado por Vieirito Shinigami (twitter.com/gitlherme)' })
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('verificar')
		.setDescription('Faz a verificação do membro no servidor!')
		.addStringOption(option => option.setName('name')
			.setDescription('Nome do personagem pra registro')
			.setRequired(true)),
	async execute(interaction) {
    const character = await getCharacterData()
		console.log(character)
		if (character.guild.name === 'Harty Punt') await interaction.reply(await generateResponse('success'));
		if (character.guild.name !== 'Harty Punt') await interaction.reply(await generateResponse('error'));
	},
};