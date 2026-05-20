const mongoose = require('mongoose')

const Schema = mongoose.Schema 

const user = new Schema({
    navn: String, 
    epost: String, 
    mobil: Number, 
    adresse: String, 
    passord: String, 
    rolle: {
        type: String, 
        enum: ["user", "admin"],
        default: "user"
    }
})
const User = mongoose.model("User", user);
module.exports = User 