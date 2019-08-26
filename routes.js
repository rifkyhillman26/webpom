const routes = require('express').Router()
const connection = require('./setapp/mysqlconnect')

routes.get('/' , (req, res) => {
    res.render('pages/home.ejs')
})

routes.get('/tutorial' , (req,res) => {
    connection.query('SELECT * FROM blogs', function (error, rows, field){
        if(error){
            console.log(error)
        }else{
            console.log(rows)
            res.render('pages/tutorial.ejs', {data: rows})
        }

    }) ;
})

routes.get('/tentang' , (req,res) => {
    res.render('pages/tentang.ejs')
})

routes.get('/register' , (req,res) => {
    res.render('pages/register.ejs')
})

routes.get('/signin' , (req,res) => {
    res.render('pages/signin.ejs')
})


module.exports = routes