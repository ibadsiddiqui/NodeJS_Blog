const mongoose = require('mongoose');
const Post = require('./database/models/Post');

mongoose.connect('mongodb://localhost/node-js-test-blog');

Post.create({
    title: "My First Blog",
    description: "Blog post description",
    content: 'lorem ipsum'
}, (error, post) => {
    console.log(error, post)
})