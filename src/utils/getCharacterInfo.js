const axios = require("axios")

module.exports = async function getCharacterData() {
  try {
    const { data } = await axios.get('https://api.tibiadata.com/v3/character/Pistoliver')
    return data.characters.character
  } catch (error) {
    console.error(error)
  }
}
