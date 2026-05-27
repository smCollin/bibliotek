const express = require('express')
const router = express.Router()
const checkUser = require('../utils/jwt')

const bookController = require('../controllers/bookControllers')

router.get('/register', checkUser, bookController.getRegisterBooks)
router.post('/register', checkUser, bookController.createRegisterBooks)



router.get('/book/:id', bookController.getBook) 
router.post('/book/:id', checkUser, bookController.deleteBook)
router.get('/book/edit/:id', checkUser, bookController.getEditBook)
router.post('/book/edit/:id', checkUser, bookController.postEditBook)
router.get('/books', bookController.showBooks)


module.exports = router;