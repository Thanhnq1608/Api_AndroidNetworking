const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');
app.use(bodyparser.json());

const {getProd, insertProd, updateProd, deleteProd} = require('./routes/product');
const {getUser, insertUser, updateUser, changePass, deleteUser} = require('./routes/user');

const config = ({
    host        : '37.59.55.185',
    user        : 'YPA5lop9VD',
    port        : 3306,
    password    : 'CoEo4yDqo6',
    database    : 'YPA5lop9VD',
    dialect     : "mysql",
    native      : true,
    pool        : { maxConnections: 50, maxIdleTime: 30},
});
app.use(bodyparser.urlencoded({
    extended: true
}));
const con = mysql.createConnection(config);
global.con = con;
con.connect(function (err) {
    if (err) {
        console.error('CONNECT FAILED', err.code);
    } else {
        console.log("DB connection succeded.");

    }
});

// var Client = mysql.Client;
// var con = new Client();
//
// con.host = '37.59.55.185';
// con.user = 'YPA5lop9VD';
// con.password = 'CoEo4yDqo6';
// con.database = 'YPA5lop9VD';
//
// app.use(bodyparser.urlencoded({
//     extended: true
// }));
// global.con = con;
// con.connect(function (err, results) {
//     if (err) {
//         console.log("ERROR: " + err.message);
//         throw err;
//     }
//     console.log("connected.");
// });

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


app.listen(process.env.PORT || 3306, () => {
    console.log('Server started on port 3000..');
});
