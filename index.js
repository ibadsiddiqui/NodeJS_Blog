const path = require('path')
const expressEdge = require('express-edge')
const express =require('express')
const app = express();

app.use(express.static('public'))
app.use(expressEdge);
app.set('views', `${__dirname}/views`);

app.get('/', (req, res) => {
    // res.sendFile(path.resolve(__dirname, 'pages/index.html'))
    res.render('index')
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/post', (req, res) => {
    res.render("post")
})

app.get('/contact', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/contact.html'))
})



app.listen(4000, ()=> {
    console.log('live at 4000')
})