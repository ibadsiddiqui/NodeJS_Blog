const expressEdge = require('express-edge');
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const expressSession = require('express-session')
const connectMongo = require('connect-mongo')


const app = express();

// database connection
mongoose.connect('mongodb://localhost/node-js-blog');


const mongoStore = connectMongo(expressSession)

app.use(expressSession({
    secret: 'secret',
    store: new mongoStore({
        mongooseConnection: mongoose.connection

    })
}))



// middlewares
app.use(fileUpload())
app.use(express.static('public'))
app.use(expressEdge);
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.set('views', `${__dirname}/views`);

const authMiddleWare = require('./middleware/auth')
const storePost = require('./middleware/storePost')



// Post controllers
const createPostController = require('./controllers/post/createPost')
const homePageController = require('./controllers/post/homePage')
const storePostController = require('./controllers/post/storePost')
const getPostController = require('./controllers/post/getPost');

// User controllers
const createUserController = require('./controllers/users/createUsers')
const storeUserController = require('./controllers/users/storeUser')
const userLoginController = require('./controllers/users/loginUser')


// root route
app.get('/', homePageController)

// get request for new user creation
app.get('/auth/register', createUserController)
app.get('/auth/login', userLoginController)
app.post('/auth/login', userLoginController)
app.post('/users/register', storeUserController)

// routes to creating new post url
app.get('/posts/new', authMiddleWare, createPostController)

// routes to single page for the post
app.get('/post/:id', getPostController)


// post request for creating new blogging post
app.post('/posts/store', authMiddleWare, storePost, storePostController);


app.listen(4000, () => {
    console.log('live at 4000')
})