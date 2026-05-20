const jwt = require('jsonwebtoken')
const User = require('../models/user')

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

module.exports = checkUser 