module.exports = (req, res) => {
    // console.log()

    res.render('register', {
        errors: req.flash('registrationErrors')
    })
}