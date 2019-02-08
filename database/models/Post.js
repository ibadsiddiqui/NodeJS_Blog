const mongoose = require('mongoose');

const PostSchma = new mongoose.Schema({
    title: String,
    subtitle: String,
    content: String,
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    image: String,
    createdAt:{
        type: Date,
        default: new Date()
    }
})
const Post = mongoose.model('Post', PostSchma)

module.exports = Post;