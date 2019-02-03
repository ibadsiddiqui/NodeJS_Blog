module.exports = (req, res) => {
    if (req.session.UserId) {
        res.render('create')

    }else {
        res.redirect('/auth/login')
    }
}