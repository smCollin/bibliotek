const jwt = require('jsonwebtoken')
const User = require('../models/user')

async function checkUser(req, res, next) {

    
    console.log(req.cookies)
    let jwtCookie = req.cookies.jwt;

    jwt.verify(jwtCookie, process.env.JWT_SECRET, async function(err, decoded) {

        try {
                    let userId = decoded.userId;
        let user = await User.findOne({_id: userId})
        console.log(user);

        if(user.rolle === "admin") {
            console.log("user is admin")
           next();
        } else {
            res.redirect("/");
        }
        } catch (error) {
            res.redirect("/login")
        }
    })


}

module.exports = checkUser;