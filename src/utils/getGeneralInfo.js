module.exports = async function getGeneralInfos(client, interaction) {
	const server = client.guilds.cache.get(interaction.guildId)
	const member = await server.members.fetch(interaction.user.id)
	return { server, member }
}