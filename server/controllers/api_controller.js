require('dotenv').config()
const axios = require('axios').default
const { petfinder } = require('../config/keys')

module.exports = {
  getToken: async (req, res) => {
    const { data } = await axios.post(`https://api.petfinder.com/v2/oauth2/token`, {
      grant_type: 'client_credentials', 
      'client_id': petfinder.key,
      client_secret: petfinder.secret
    })
    const token = data.access_token
    
    try {
      const response = await axios.get('https://api.petfinder.com/v2/animals?coat=short&size=large&gender=female', {
        headers: {"Authorization": `Bearer ${token}`}
      })
      console.log(process.env.APP_URL)
      res.status(200)
         .setHeader("Access-Control-Allow-Origin", process.env.APP_URL || '*')
         .setHeader("Access-Control-Allow-Credentials", true)
         .json(response.data)
    } catch (err) {
      console.log(err)
    }

  }
}