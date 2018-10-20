const expressEdge = require('express-edge');
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser')
const app = express();

const Post = require('./database/models/Post')
mongoose.connect('mongodb://localhost/node-js-blog')

app.use(express.static('public'))
app.use(expressEdge);
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.set('views', `${__dirname}/views`);

app.get('/', async (req, res) => {
    const posts = await Post.find({})
    
    console.log(posts)

    res.render('index', {
        posts
    })
})

// routes to creating new post url
app.get('/posts/new', (req, res) => {
    res.render('create')
})

// 
app.post('/posts/store', (req, res) => {
    Post.create(req.body, (error, post) => {
        if (error) 
            throw error;
        res.redirect('/');
        
    })

})


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