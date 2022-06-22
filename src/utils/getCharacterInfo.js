const axios = require("axios")

module.exports = async function getCharacterData(name) {
  try {
    const { data } = await axios.get(`https://api.tibiadata.com/v3/character/${name}`)
    return data.characters.character
  } catch (error) {
    console.error(error)
  }
}
