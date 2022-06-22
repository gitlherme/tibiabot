const { SlashCommandBuilder } = require('@discordjs/builders');
const getCharacterData = require('../api/getCharacterInfo')


module.exports = {
	data: new SlashCommandBuilder()
		.setName('verificar')
		.setDescription('Faz a verificação do membro no servidor!'),
	async execute(interaction) {
    const character = await getCharacterData()
    await interaction.reply(await character);
	},
};