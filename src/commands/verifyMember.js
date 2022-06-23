const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Guild } = require('discord.js');
const getCharacterData = require('../utils/getCharacterInfo')


async function giveAccess(client, interaction) {
	const server = client.guilds.cache.get(interaction.guildId)
	const member = await server.members.fetch(interaction.user.id)
	const role = await server.roles.fetch('989562433666449479')
	member.roles.add(role)
}

async function changeName(client, interaction, name, vocation) {
	const server = client.guilds.cache.get(interaction.guildId)
	const member = await server.members.fetch(interaction.user.id)
	if (vocation.includes('Knight')) member.setNickname(`[EK] ${name}`)
	if (vocation.includes('Paladin')) member.setNickname(`[RP] ${name}`)
	if (vocation.includes('Druid')) member.setNickname(`[ED] ${name}`)
	if (vocation.includes('Sorcerer')) member.setNickname(`[MS] ${name}`)
}

function generateResponse(type) {
	const description = {
		success: `Tudo certo! Verifique se possui o acesso completo ao Discord. 🥳`,
		error: `Ops! Parece que esse personagem não existe ou não faz parte da Guild. 😵`,
		verified: `O seu personagem já foi verificado antes. Você já possui acesso completo ao Discord. 😁`
	}

	const embed = new MessageEmbed()
		.setTitle('Verificação do personagem')
		.setDescription(description[type])
		.setFooter({ text: 'Criado por Vieirito Shinigami (twitter.com/gitlherme)' })
	
	return { embeds: [embed] }
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('verificar')
		.setDescription('Faz a verificação do membro no servidor!')
		.addStringOption(option => option.setName('name')
			.setDescription('Nome do personagem pra registro')
			.setRequired(true)),
	async execute(interaction, client) {
		const characterToBeVerified = interaction.options.getString('name')
    const character = await getCharacterData(characterToBeVerified)
		if (character.guild.name === 'Harty Punt') {
			giveAccess(client, interaction)
			changeName(client, interaction, character.name, character.vocation)
			await interaction.reply(await generateResponse('success'));
		}
		if (character.guild.name !== 'Harty Punt') await interaction.reply(await generateResponse('error'));
	},
};