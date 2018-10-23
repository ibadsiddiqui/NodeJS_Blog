const mongoose = require('mongoose');

const PostSchma = new mongoose.Schema({
    title: String,
    description: String,
    content: String,
    username: String,
    createdAt:{
        type: Date,
        default: new Date()
    }
})
const Post = mongoose.model('Post', PostSchma)

module.exports = Post;