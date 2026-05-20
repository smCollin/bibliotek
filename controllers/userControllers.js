const jwt = require('jsonwebtoken')
const argon2 = require('argon2')
const User = require('../models/user')

const userController = {
    getCreateUser: (req, res) => {
        res.render("createUser")
    },
    getLoginUser: (req, res) => {
        res.render("login")
    },
    postCreateUser: async (req, res) => {
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
    },
    postLoginUser: async (req, res) => {
        const { mail, passord } = req.body;

        const user = await User.findOne({
            epost: mail
        })

        console.log(user)


        const hash = user.passord
        const isMatch = await argon2.verify(hash, passord)


        if (isMatch) {
            let jsonwebtoken = jwt.sign({ userId: user._id, role: user.rolle }, "turbofish9000")

            console.log(jsonwebtoken)

            res.cookie("jwt", jsonwebtoken, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true })

            res.redirect("/register")
        } else {
            res.status(401).send("Bruker eller passord stemmer ikke")
        }
    },
    getShowUsers: async (req, res) => {
        const users = await User.find()
        res.render("showUsers", { users })
    },
    getUser: async (req, res) => {
        console.log(req.params.id);
        const id = req.params.id;

        try {
            const user = await User.findById(id)
            console.log(user);
            res.render("user")
        } catch (error) {
            console.log(error);
            res.status(404).send("Finner ikke bruker")
            res.send(error)
        }

    }

}

module.exports = userController;