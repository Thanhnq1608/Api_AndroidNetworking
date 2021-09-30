const mysql = require('mysql');
const express = require('express');
var app = express();
var port = process.env.PORT ||3000 ;
const bodyparser = require('body-parser');
app.use(bodyparser.json());
// const dbConfig = require('./database/db.config');

const {getProd, insertProd, updateProd, deleteProd} = require('./routes/product');
const {getUser, insertUser, updateUser, changePass, deleteUser} = require('./routes/user');

// const config = ({
//     server: 'sql6.freemysqlhosting.net',
//     name: 'sql6440785',
//     username: 'sql6440785',
//     password: 'k4h2rQmBBn',
//     port: 3306,
//     database: 'sql6440785',
// });
app.use(bodyparser.urlencoded({
    extended: true
}));
const con = mysql.createConnection({
    host: '52.74.77.8',
    user: 'sql6440785',
    password: 'k4h2rQmBBn',
    port: 3306,
    database: 'sql6440785',
});
global.con = con;
con.connect(function (err) {
    if (err) {
        console.error('CONNECT FAILED', err.code);
    } else {
        console.log("DB connection succeded.");

    }
});
app.get("/", (req, res) => {
    res.send("Hello world");
})
// CRUD Product
app.get('/getProd', getProd);
app.post('/insertProd', insertProd);
app.put('/updateProd', updateProd);
app.post('/deleteProd', deleteProd);
// CRUD User
app.get('/getUser', getUser);
app.post('/insertUser', insertUser);
app.put('/updateUser', updateUser);
app.post('/changePass', changePass);
app.post('/deleteUser', deleteUser);


app.listen(port, () => {
    console.log(`Server started on port: http://localhost:${port}`);
});
