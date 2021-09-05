var mysql = require('mysql');
var express = require('express');
var app = express();
const bodyparser = require('body-parser');
app.use(bodyparser.json());

const {getProd, insertProd, updateProd, deleteProd} = require('./routes/product');
const {getUser, insertUser, updateUser, changePass, deleteUser} = require('./routes/user');

var config = ({
    host: '37.59.55.185',
    user: 'YPA5lop9VD',
    password: 'CoEo4yDqo6',
    port: 3306,
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

// app.get("/", (req, res) => {
//     res.send("Hello world");
// })
app.get('/', (req, res) => {
    let sql = `select * from products`;
    con.query(sql, (err, result) => {
        var products = [];
        if (err) {
            console.log(JSON.stringify(err));
            res.json({
                "Error": 1,
                "Message": "Error while getting the data from Remote DataBase motherofall.org" + err
            });
        } else {
            for (var i = 0; i < result.length; i++) {
                products.push({
                    id: result[i].id,
                    avatar: result[i].avatar,
                    name: result[i].name,
                    price: result[i].price,
                    soLuongTon: result[i].soLuongTon,
                    description: result[i].description
                });
            }
            res.send(JSON.stringify(products));
        }
    })
},)
// CRUD Product
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
