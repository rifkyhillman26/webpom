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
            res.render('pages/tutorial.ejs', {data: rows})
        }

    }) ;
})

routes.get('/tentang' , (req,res) => {
    res.render('pages/tentang.ejs')
})

routes.get('/register' , (req,res) => {
    if(res.locals.kunci) {
        res.redirect('/')
    } else {
        res.render('pages/register.ejs', {err: false})
    }
})

routes.get('/signin' , (req,res) => {
    if(res.locals.kunci) {
        res.redirect('/')
    } else {
        res.render('pages/signin.ejs', {err : false})
    }
})

routes.post('/proses-signin' , (req,res) => {
    console.log(req.body)
    connection.query('SELECT * FROM user WHERE username= ? AND password= ?',
        [ req.body.username, req.body.password ] ,
        function (error, rows, field) {
            if(error) {
                res.render('pages/signin.ejs', {err: 'lognin gagal'})
            } else{
                if(rows.length > 0) {
                    req.session.kunci = {
                        username: rows[0].username
                    }
                    res.redirect('/')
                } else{
                    res.render('pages/signin.ejs', {err: 'password atau username salah'})
                }
            }
        });
})


routes.get('/logout' , (req,res) => {
    if (req.session) {
        // delete session object
        req.session.destroy(function(err) {
          if(err) {
            return next(err);
          } else {
            return res.redirect('/');
          }
        });
      }
})

routes.get('/add-blog' , (req,res) => {
    res.render('pages/add-blog.ejs')
})
routes.get('/home2' , (req,res) => {
    res.render('pages/home2.ejs')
})

routes.get('/kategoris' , (req,res) => {
    connection.query('SELECT * FROM kategori', function (error, rows, field){
        if(error){
            console.log(error)
        }else{
            console.log(rows)
            res.render('pages/kategoris.ejs', {data: rows})
        }

    }) ;
})

routes.post('/save-blog' , (req,res) => {

    const created_at = new Date();

    connection.query('INSERT INTO blogs (title, content, created_at) values (?,?,?)', 
    [ req.body.title, req.body.content, created_at ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            res.redirect('/tutorial')
        }
    });
})

routes.post('/proses-register' , (req,res) => {

    if(req.body.password === req.body.Repeatpsw) {
        connection.query('INSERT INTO user (username, password) values (?,?)',
        [ req.body.username, req.body.password ] ,
        function (error, rows, field) {
            if(error) {
                console.log(error)
            } else{
                res.redirect('/signin')
            }
        });
    } else {
        res.render('pages/register.ejs', { err: 'Password Tidak Sama'})
    }
    
})


routes.post('/proses-kategori' , (req,res) => {

    connection.query('INSERT INTO kategori (Nama) values (?)', 
    [ req.body.Nama ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            console.log(rows)
            res.redirect('/kategoris')
        }
    });
})

routes.get('/hapus-kategori/:id' , (req,res) => {

    connection.query('DELETE FROM kategori WHERE id = (?)', 
    [ req.params.id ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            console.log(rows)
            res.redirect('/kategoris')
        }
    });
})

routes.get('/hapus-blog/:id' , (req,res) => {

    connection.query('DELETE FROM blogs WHERE id = (?)', 
    [ req.params.id ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            console.log(rows)
            res.redirect('/tutorial')
        }
    });
})


module.exports = routes