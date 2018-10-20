const mongoose = require('mongoose');
const Post = require('./database/models/Post');

mongoose.connect('mongodb://localhost/node-js-test-blog');



// find specific by ID
// Post.findById("5bca4123131f12d184314d6c", (error, post) => {
// console.log(error, post);
// })

// find all query
Post.find({}, (error, post) => {
console.log(error, post)
})


// insert query for Post database
// Post.create({
//     title: "My First Blog",
//     description: "Blog post description",
//     content: 'lorem ipsum'
// }, (error, post) => {
//     console.log(error, post)
// })


// find and Update using ID
// Post.findByIdAndUpdate("5bca4123131f12d184314d6c", {
//         title: "This is Ibad siddiqui's blog"
//     }, (error, post) => {
//         console.log(error, post)
// })

// find and remove by ID
// Post.findByIdAndRemove("5bca4123131f12d184314d6c", (error, post) => console.log(error, post))