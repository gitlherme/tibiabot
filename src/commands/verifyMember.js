const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Guild } = require('discord.js');
const getCharacterData = require('../utils/getCharacterInfo')

async function getGeneralInfos(client, interaction) {
	const server = client.guilds.cache.get(interaction.guildId)
	const member = await server.members.fetch(interaction.user.id)
	return {
		server,
		member
	}
}


async function giveRole(role) {
	const { member } = getGeneralInfos()
	const fetchRole = await server.roles.fetch(role)
	member.roles.add(fetchRole)
}

async function changeName(name, vocation) {
	const { member } = getGeneralInfos()
	if (vocation.includes('Knight')) member.setNickname(`[EK] ${name}`)
	if (vocation.includes('Paladin')) member.setNickname(`[RP] ${name}`)
	if (vocation.includes('Druid')) member.setNickname(`[ED] ${name}`)
	if (vocation.includes('Sorcerer')) member.setNickname(`[MS] ${name}`)
}

async function changeVocationRole(vocation) {
	if (vocation.includes('Knight')) giveRole('989656753677414490')
	if (vocation.includes('Paladin')) giveRole('989656715765104671')
	if (vocation.includes('Druid'))giveRole('989656687222853682')
	if (vocation.includes('Sorcerer')) giveRole('989656636761194556')
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
			getGeneralInfos(client, interaction)
			changeVocationRole(character.vocation)
			changeName(client, interaction, character.name, character.vocation)
			await interaction.reply(await generateResponse('success'));
		}
		if (character.guild.name !== 'Harty Punt') await interaction.reply(await generateResponse('error'));
	},
};