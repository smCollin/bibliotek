const express = require('express')
const router = express.Router()

const userController = require('../controllers/userControllers');

router.get('/createUser', userController.getCreateUser);
router.post('/createUser', userController.postCreateUser);

router.get('/login', userController.getLoginUser);
router.post('/login', userController.postLoginUser); 

router.get('/users', userController.getShowUsers);

router.get('/users/:id', userController.getUser);
router.post('/users/:id', userController.deleteUser);

router.get('/uers/edit/:id', userController.getEditUser);

module.exports = router; 