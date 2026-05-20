const express = require('express')
const router = express.Router()

const userController = require('../controllers/userControllers')

router.get('/createUser', userController.getCreateUser)
router.post('/createUser', userController.postCreateUser)
router.get('/login', userController.getLoginUser)
router.post('/login', userController.postLoginUser)


module.exports = router; 