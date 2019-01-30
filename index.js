const path = require('path');
const expressEdge = require('express-edge');
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

const Post = require('./database/models/Post');

const app = express();



// database connection
mongoose.connect('mongodb://localhost/node-js-blog');

// middlewares
app.use(fileUpload())
app.use(express.static('public'))
app.use(expressEdge);
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.set('views', `${__dirname}/views`);

const storePost = require('./middleware/storePost')

// Post controllers
const createPostController = require('./controllers/post/createPost')
const homePageController = require('./controllers/post/homePage')
const storePostController = require('./controllers/post/storePost')
const getPostController = require('./controllers/post/getPost');

// User controllers
const createUserController = require('./controllers/users/createUsers')

// root route
app.get('/', homePageController)

// get request for new user creation
app.get('/auth/register', createUserController)

// routes to creating new post url
app.get('/posts/new', createPostController)

// routes to single page for the post
app.get('/post/:id', getPostController)

// middleware for post
app.use('/posts/store', storePost)
// post request for creating new blogging post
app.post('/posts/store', storePostController);


app.listen(4000, () => {
    console.log('live at 4000')
})