const express = require('express')
const router = express.Router()
const checkUser = require('../utils/jwt')

const bookController = require('../controllers/bookControllers')

router.get('/register', checkUser, bookController.getRegisterBooks)
router.post('/register', checkUser, bookController.createRegisterBooks)

module.exports = router;