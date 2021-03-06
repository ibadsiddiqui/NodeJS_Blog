const path = require('path')
const Post = require('../../database/models/Post')

module.exports = (req, res) => {

    const { image } = req.files;

    // you need to create a posts folder in the public directory
    image.mv(path.resolve(__dirname, '..', 'public/posts', image.name), error => {

        Post.create({
            ...req.body,
            image: `/posts/${image.name}`,
            author: req.session.UserId

        }, (error, post) => {
            res.redirect('/');

        })
    })
}