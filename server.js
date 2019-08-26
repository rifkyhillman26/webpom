const express = require('express')
const app = express()

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: true })) 
app.use(express.json())
app.use(express.static('public'))
app.use('/' , require('./routes'))

app.listen(3000, (req, res) => {
    console.log('server Run http://localhost:3000')
})



module.exports = app