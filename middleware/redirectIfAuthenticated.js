module.exports = (req, res, next) => {

    // fetch user from database
    if (req.session.UserId) {
        return res.redirect('/')
    }
    next();
}