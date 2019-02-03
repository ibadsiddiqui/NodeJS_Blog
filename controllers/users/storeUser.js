const User = require('./../../database/models/Users')

module.exports = (req, res) => {
    User.createUser(req.body, (error, user) => {
        if (error)
            return res.render('/auth/register')
        else
            return res.redirect('/')
    })
}