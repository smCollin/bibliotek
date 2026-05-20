const Book = require('../models/book')

const bookController = {
    getRegisterBook: (req, res, next) => {
        console.log("moving on to this function")
        res.render("register")
    },
    showBooks: async (req, res ) =>{
        const books = await Book.find();
        console.log(books);
        res.render("showBooks", {books})
    },
    registerBook: async (req, res) => {
        const { forfatter, tittle, antallSider, forlag, ISBN, arstall } = req.body;

        const result = new Book({
            forfatter, tittle, antallSider, forlag, ISBN, arstall
        })
        await result.save()

        console.log(result);
        res.status(201).send("Takk for registrering")
    }
}


module.exports = bookController;