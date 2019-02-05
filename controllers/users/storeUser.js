const User = require('./../../database/models/Users')

module.exports = (req, res) => {
    User.createUser(req.body, (error, user) => {
        if (error) {
            const registrationErrors = Object.keys(error.errors).map(key => error.errors[key].message)
            req.session.registrationErrors = registrationErrors
            return res.render('/auth/register')
        }
        else
            return res.redirect('/')
    })
}