var mysql = require('mysql');
var express = require('express');
var fileUpload = require("express-fileupload");
var app = express();
const port = process.env.PORT || 8080;
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
app.get("/",(req,res)=>{
    res.send("Hello world");
})

// CRUD Product
app.get('/getProd',getProd);
app.post('/insertProd',insertProd);
app.put('/updateProd',updateProd);
app.post('/deleteProd',deleteProd);
// CRUD User
app.get('/getUser',getUser);
app.post('/insertUser',insertUser);
app.put('/updateUser',updateUser);
app.post('/changePass',changePass);
app.post('/deleteUser',deleteUser);


app.listen(port, () => {
    console.log('Server started on port 3000..');
});
