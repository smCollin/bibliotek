const express = require('express')
const mongoose = require('mongoose')
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const cookieparser = require('cookie-parser')
require("dotenv").config();

const User = require('./models/user')
const Book = require('./models/book')
const checkUser = require('./utils/jwt')
const bookRoutes = require('./routes/bookRoutes')
const userRoutes = require('./routes/userRoutes')

mongoose.connect(process.env.DB_URL)

const app = express()


app.set("view engine", "ejs");


app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use(cookieparser());

app.use(bookRoutes);

app.use(userRoutes);


app.get("/", (req, res) => {
    res.render("index")
})

app.listen(process.env.PORT)
