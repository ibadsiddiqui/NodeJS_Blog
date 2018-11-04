const path = require('path');
const expressEdge = require('express-edge');
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

const Post = require('./database/models/Post');

const app = express();


// controllers
const createPostController = require('./controllers/createPost')



mongoose.connect('mongodb://localhost/node-js-blog');

app.use(fileUpload())
app.use(express.static('public'))
app.use(expressEdge);
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.set('views', `${__dirname}/views`);

const validateCreatePostMiddleware = (req, res, next) => {
    if(!req.files.image || ! req.body.username || !req.body.title || !req.body.subtitle || !req.body.content){
        return res.redirect('/posts/new')
    }

    next();
}

app.use('/posts/store' ,validateCreatePostMiddleware)


app.get('/', async (req, res) => {
    const posts = await Post.find({})

    res.render('index', {
        posts
    })
})

// routes to creating new post url
app.get('/posts/new', createPostController)

// routes to single page for the post
app.get('/post/:id', async (req, res) => {
    const post = await Post.findById(req.params.id);
    res.render("post", { post })
})



// post request for creating new blogging post
app.post('/posts/store', (req, res) => {

    const { image } = req.files;
    console.log(image);

    // you need to create a posts folder in the public directory
    image.mv(path.resolve(__dirname, 'public/posts', image.name), error => {

        Post.create({
            ...req.body,
            image: `/posts/${image.name}`
        }, (error, post) => {
            res.redirect('/');

        })
    })
});


app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/post', (req, res) => {
    res.render("post")
})

app.get('/contact', (req, res) => {
    res.render("contact")
})



app.listen(4000, () => {
    console.log('live at 4000')
})