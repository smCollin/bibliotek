const express = require('express');
const router = express.Router(); 
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const User = require ('../models/user')

router.get("/login", (req, res) => {
    res.render("login")
})
router.get('/createUser', (req, res) => {
    res.render("createUser")
})
router.post("/login", async (req, res) => {
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

router.post("/createUser", async (req, res) => {
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



module.exports = router; 