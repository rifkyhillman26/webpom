const mysql = require('mysql')

const con = mysql.createConnection({
    host: 'localhost',
    user: 'lokal',
    password: '123456',
    database: 'webprom'
});

con.connect((err) => {
    if(err) throw err
})

module.exports = con