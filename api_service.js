var mysql = require('mysql');
var express = require('express');
var fileUpload = require("express-fileupload");
var app = express();
var port = 3001;
const bodyparser = require('body-parser');
app.use(bodyparser.json());
var host = '192.168.1.6';

const {getProd,insertProd,updateProd,deleteProd} =require('./routes/product');
const {getUser,insertUser,updateUser,changePass,deleteUser}=require('./routes/user');

var con = mysql.createConnection({
    host: '37.59.55.185',
    user: 'YPA5lop9VD',
    password: 'CZxjB0tcLv',
    port: 3306,
    database: 'YPA5lop9VD'
});
global.con=con;

app.use(bodyparser.urlencoded({
    extended: true
}));

con.connect(function (err) {
    if (!err)
        console.log("DB connection succeded.");
    else
        console.log("DB connection failed \n" + JSON.stringify(err, undefined, 2));
});

// CRUD Product
app.get('/app/getProd',getProd);
app.post('/app/insertProd',insertProd);
app.put('/app/updateProd',updateProd);
app.post('/app/deleteProd',deleteProd);
// CRUD User
app.get('/app/getUser',getUser);
app.post('/app/insertUser',insertUser);
app.put('/app/updateUser',updateUser);
app.post('/app/changePass',changePass);
app.post('/app/deleteUser',deleteUser);


app.listen(port, host, () => {
    console.log('Server started on port 3000..');
});
