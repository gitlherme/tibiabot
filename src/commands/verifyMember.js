const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const getCharacterData = require('../utils/getCharacterInfo')
const getGeneralInfos = require('../utils/getGeneralInfo')

async function giveRole(server, member, roleToBeGived) {
	const fetchRole = await server.roles.cache.find(roleToBeGived)
	member.roles.add(fetchRole)
}

async function changeName(member, name, vocation) {
	if (vocation.includes('Knight')) member.setNickname(`[EK] ${name}`)
	if (vocation.includes('Paladin')) member.setNickname(`[RP] ${name}`)
	if (vocation.includes('Druid')) member.setNickname(`[ED] ${name}`)
	if (vocation.includes('Sorcerer')) member.setNickname(`[MS] ${name}`)
}

async function changeVocationRole(server, member, vocation) {
	if (vocation.includes('Knight')) giveRole(server, member,'698609256886304788')
	if (vocation.includes('Paladin')) giveRole(server, member,'698609350985646180')
	if (vocation.includes('Druid'))giveRole(server, member,'698609308031778826')
	if (vocation.includes('Sorcerer')) giveRole(server, member,'698609390189674589')
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
		const { server, member } = await getGeneralInfos(client, interaction)
		const characterToBeVerified = interaction.options.getString('name')
    const character = await getCharacterData(characterToBeVerified)
		if (character.guild.name === 'Harty Punt') {
			giveRole(server, member, '699071273401319464')
			changeVocationRole(server, member, character.vocation)
			changeName(member, character.name, character.vocation)
			await interaction.reply(await generateResponse('success'));
		}
		if (character.guild.name !== 'Harty Punt') await interaction.reply(await generateResponse('error'));
	},
};