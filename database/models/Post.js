const mongoose = require('mongoose');

const PostSchma = new mongoose.Schema({
    title: String,
    subtitle: String,
    content: String,
    username: String,
    image: String,
    createdAt:{
        type: Date,
        default: new Date()
    }
})
const Post = mongoose.model('Post', PostSchma)

module.exports = Post;