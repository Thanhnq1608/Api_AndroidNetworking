var mysql = require('mysql');
var express = require('express');
var app = express();
var port= process.env.PORT || 3306;
const bodyparser = require('body-parser');
app.use(bodyparser.json());

const {getProd, insertProd, updateProd, deleteProd} = require('./routes/product');
const {getUser, insertUser, updateUser, changePass, deleteUser} = require('./routes/user');

var config = ({
    host: '37.59.55.185',
    user: 'YPA5lop9VD',
    password: 'CoEo4yDqo6',
    port: port,
    database: 'YPA5lop9VD',
    server: 'remotemysql.com',
});
app.use(bodyparser.urlencoded({
    extended: true
}));
var con = mysql.createConnection(config);
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
    console.log('Server started on port 3000..');
});
