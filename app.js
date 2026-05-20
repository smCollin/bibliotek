const express = require('express')
const mongoose = require('mongoose')
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const cookieparser = require('cookie-parser')

const User = require('./models/user')
const Book = require('./models/book')

mongoose.connect('mongodb://localhost:27017/bibiolotek')

const app = express()


app.set("view engine", "ejs");


app.use(express.urlencoded({ extended: true }));

app.use(cookieparser())


app.get("/", (req, res) => {
    res.render("index")
})


app.get("/login", (req, res) => {
    res.render("login")
})
app.get('/createUser', (req, res) => {
    res.render("createUser")
})
app.get("/register", checkUser, (req, res, next) => {
        res.render("register")
})
app.post("/login", async (req, res) => {
    const { mail, passord } = req.body;

    const user = await User.findOne({
        epost: mail
    })

    console.log(user)


    const hash = user.passord
    const isMatch = await argon2.verify(hash, passord)


    if (isMatch) {
        let jsonwebtoken = jwt.sign({ userId: user._id, role:user.rolle }, "turbofish9000")

        console.log(jsonwebtoken)

        res.cookie("jwt", jsonwebtoken, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true })

        res.redirect("/register")
    } else {
        res.status(401).send("Bruker eller passord stemmer ikke")
    }
})

app.post("/createUser", async (req, res) => {
    // henter ut info fra frontenden
    const { navn, epost, mobil, adresse, passord, gjentapassord } = req.body;


    if (passord === gjentapassord) {
        const hash = await argon2.hash(passord)
        // lager vi en ny bruker
        const result = new User({
            navn: navn,
            epost: epost,
            mobil: mobil,
            adresse: adresse,
            passord: hash
        })
        // lagrer bruker i database
        await result.save()

        // sender melding tilbake til frontend
        res.status(201).send('Du har nå opprettet en bruker')
    } else {
        res.status(400).send('Dette passord stemmer ikke overens')
    }
})

app.post("/register", checkUser, async (req, res) => {
        const { forfatter, tittle, antallSider, forlag, ISBN, arstall } = req.body;

        const result = new Book({
            forfatter, tittle, antallSider, forlag, ISBN, arstall
        })
        await result.save()

        console.log(result);
        res.status(201).send("Takk for registrering")
})

async function checkUser(req, res, next) {
    console.log(req.cookies)
    let jwtCookie = req.cookies.jwt;

    jwt.verify(jwtCookie, 'turbofish9000', async function(err, decoded) {

        let userId = decoded.userId;
        let user = await User.findOne({_id: userId})
        console.log(user);

        if(user.rolle === "admin") {
            console.log("user is admin")
           next();
        } else {
            res.redirect("/");
        }
    })


}
app.listen(4000)
