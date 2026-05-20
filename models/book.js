const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const book = new Schema({
    forfatter: String, 
    tittle: String,
    antallSider: Number, 
    forlag: String, 
    ISBN: String, 
    arstall: Number
})
const Book = mongoose.model("Book", book) 
module.exports = Book;
