const express = require('express')
const mongoose = require('mongoose')
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const cookieparser = require('cookie-parser')

const User = require('./models/user')
const Book = require('./models/book')
const checkUser = require('./utils/checkUser')
const bookRoute = require('./routes/bookRoute')

const UserRoute = require('./routes/UserRoute')

mongoose.connect('mongodb://localhost:27017/bibiolotek')

const app = express()


app.set("view engine", "ejs");
app.use(express.static('public'));


app.use(express.urlencoded({ extended: true }));

app.use(cookieparser())

app.use(UserRoute);

app.use(bookRoute);

app.get("/", (req, res) => {
    res.render("index")
})



app.listen(4000)
