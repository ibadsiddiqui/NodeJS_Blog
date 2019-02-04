const User = require('./../database/models/Users')

module.exports = (req, res, next) => {

    // fetch user from database
    User.findById(req.session.UserId, (error, user) => {
        if (error || !user) {
            res.redirect('/')
        } else {

            next();
        }
    })
}