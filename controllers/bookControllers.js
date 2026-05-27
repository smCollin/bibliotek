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
    
    showBooks: async (req, res) => {
        const books = await Book.find() 
    
        res.render("showBooks", {books})
    },
    getBook: async (req, res) => {
        const id = req.params.id;

        try{
        const book = await Book.findById(id) 
        res.render("book", {book})
        } catch (error) {
            res.send("Finner ikke bok")
        }
    },
    deleteBook: async (req, res) => {
        const id = req.params.id;
        try {
            const book = await Book.deleteOne({_id:id})
            res.redirect("/books")
        } catch (error) {
            res.send("Kunne ikke slette")
        }
    },
    getEditBook: async (req, res) => {
        try {
        const id =  req.params.id
        const book = await Book.findById(id)
        res.render('editbook', {book})
        } catch (error) {
            res.send("Kan ikke finne bok")
        }
    },
    postEditBook: async (req, res) => {
        try {
            const id = req.params.id
            const { forfatter, tittle, antallSider, forlag, ISBN, arstall } = req.body; 
            const book = await Book.findByIdAndUpdate(id, {forfatter, tittle, antallSider, forlag, ISBN, arstall})
            res.redirect('/books')
        } catch (error) {
            console.log(error);
            res.send("Det gikk ikke å redigere")
        }
    }
}


module.exports = bookController;