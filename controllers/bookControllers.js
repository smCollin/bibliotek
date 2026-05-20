const Book = require('../models/book')

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
    }

}

module.exports = bookController;