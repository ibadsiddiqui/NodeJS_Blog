const mongoose = require('mongoose');

const PostSchma = new mongoose.Schema({
    title: String,
    description: String,
    content: String,
})
const Post = mongoose.model('Post', PostSchma)

module.exports = Post;