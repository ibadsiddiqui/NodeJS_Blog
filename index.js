const express =require('express')
const app = express();

app.use(express.static('public'))

app.get('/', (req, res) => {
    
})


app.listen(4000, ()=> {
    console.log('live at 4000')
})