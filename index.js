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
const homePageController = require('./controllers/homePage')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost');

// database connection
mongoose.connect('mongodb://localhost/node-js-blog');

// middlewares
app.use(fileUpload())
app.use(express.static('public'))
app.use(expressEdge);
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.set('views', `${__dirname}/views`);

const validateCreatePostMiddleware = (req, res, next) => {
    if (!req.files.image || !req.body.username || !req.body.title || !req.body.subtitle || !req.body.content) {
        return res.redirect('/posts/new')
    }

    next();
}

app.use('/posts/store', validateCreatePostMiddleware)


app.get('/', homePageController)

// routes to creating new post url
app.get('/posts/new', createPostController)

// routes to single page for the post
app.get('/post/:id', getPostController)

// post request for creating new blogging post
app.post('/posts/store', storePostController);


app.listen(4000, () => {
    console.log('live at 4000')
})