const express = require('express')
const router = express.Router();

const bookController = require('../controllers/bookController')
const checkUser = require('../utils/checkUser')

router.get('/register',checkUser, bookController.getRegisterBook);
router.post('/register', checkUser, bookController.registerBook);
router.get('/books', bookController.showBooks);

module.exports = router; 