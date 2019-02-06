const User = require('./../../database/models/Users')

module.exports = (req, res) => {
    User.createUser(req.body, (error, user) => {
        if (error) {
            console.log(error)
            const registrationErrors = Object.keys(error.errors).map(key => error.errors[key].message)

            req.flash('registrationErrors', registrationErrors)
            req.flash('data', req.body)
            return res.redirect('/auth/register')
        }
        else
            return res.redirect('/')
    })
}