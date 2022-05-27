const express = require('express')
const router = express.Router()
const cors = require('cors')
const users_controller = require('../controllers/users_controller')
const pets_controller = require('../controllers/pets_controller')
const api_controller = require('../controllers/api_controller')

var corsOptions = {
      origin: 'https://polar-castle-85308.herokuapp.com/',
      optionsSuccessStatus: 200 
}
    

router.route('/users')
      .post(users_controller.store)

router.route('/users/:user')
      .get(users_controller.show)

router.route('/users/:user/pets/:pet')
      .put(users_controller.update) // Adds a 'loved' pet to the user

router.route('/pets')
      .post(pets_controller.store)

router.get('/token', cors(corsOptions), api_controller.getToken)

module.exports = router