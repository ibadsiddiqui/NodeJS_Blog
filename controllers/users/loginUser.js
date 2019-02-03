const User = require('./../../database/models/Users')
const bcrypt = require('bcrypt')

module.exports = (req, res) => {
    if (req.method === "GET")
        res.render("login")
    else {
        const { email, password } = req.body
        User.findOne({ email }, (error, user) => {
            if (error) throw error;
            if (user) {
                bcrypt.compare(password, user.password, (error, same) => {
                    if (error) throw error;
                    if (same) {
                        req.session.UserId = user._id
                        res.redirect('/')
                    } else {
                        res.redirect('/auth/login')
                    }
                })
            } else {
                return res.redirect('/auth/login')
            }
        })
    }
}