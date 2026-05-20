const Book = require('../models/book');
const { param } = require('../routes/bookRoutes');

const bookController = {
    getRegisterBooks: (req, res, next) => {
        res.render("register")
},
    createRegisterBooks: async (req, res) => {
            const { forfatter, tittle, antallSider, forlag, ISBN, arstall } = req.body;
    
            const result = new Book({
                forfatter, tittle, antallSider, forlag, ISBN, arstall
            })
            await result.save()
    
            console.log(result);
            res.status(201).send("Takk for registrering")
    },
    getBook: async (req, res) => {
        const id = req.params.id;

        try{
        const book = await Book.findById(id) 
        res.render("book", {book})
        } catch (error) {
            res.send("Finner ikke bok")
        }
    }
}

module.exports = bookController;