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
            let jsonwebtoken = jwt.sign({ userId: user._id, role: user.rolle }, process.env.JWT_SECRET)

            console.log(jsonwebtoken)

            res.cookie("jwt", jsonwebtoken, { maxAge: process.env.COOKIE_LIMET * 60 * 60 * 1000, httpOnly: true })

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
            res.render("user", {user})
        } catch (error) {
            console.log(error);
            res.status(404).send("Finner ikke bruker")
            res.send(error)
        }
        },
        deleteUser: async (req, res) => {
            const id = req.params.id
            try {
            const user = await User.deleteOne({_id:id})
            res.redirect('/users')
            } catch (error) {
                res.send("Kunne ikke slette bruker")
            }
    },
    getEditUser: async (req, res) => { 
        try {
        const id = req.params.id

        } catch (error) {
            
        }
    }

}

module.exports = userController;