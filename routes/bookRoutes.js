const express = require('express')
const router = express.Router()
const checkUser = require('../utils/jwt')

const bookController = require('../controllers/bookControllers')

router.get('/register', checkUser, bookController.getRegisterBooks)
router.post('/register', checkUser, bookController.createRegisterBooks)



router.get('/book/:id', bookController.getBook) 
router.post('/book/:id', bookController.deleteBook)
router.get('/books', bookController.showBooks)


module.exports = router;