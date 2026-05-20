const express = require('express')
const mongoose = require('mongoose')
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const cookieparser = require('cookie-parser')

const User = require('./models/user')
const Book = require('./models/book')
const checkUser = require('./utils/jwt')
const bookRoutes = require('./routes/bookRoutes')
const userRoutes = require('./routes/userRoutes')

mongoose.connect('mongodb://localhost:27017/bibiolotek')

const app = express()


app.set("view engine", "ejs");


app.use(express.urlencoded({ extended: true }));

app.use(cookieparser())

app.use(bookRoutes);

app.use(userRoutes);


app.get("/", (req, res) => {
    res.render("index")
})

app.listen(4000)
