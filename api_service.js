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
    port: process.env.PORT ||8080,
    database: 'YPA5lop9VD',
});
app.use(bodyparser.urlencoded({
    extended: true
}));

function startConnection() {
    console.error('CONNECTING');
    con = mysql.createPool(config);
    global.con=con;
    con.connect(function (err) {
        if (err) {
            console.error('CONNECT FAILED', err.code);
            startConnection();
        } else
            console.log("DB connection succeded.");
    });
    con.on('error', function (err) {
        if (err.fatal)
            startConnection();
    });
}

startConnection();

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


app.listen(process.env.PORT || 8080, () => {
    console.log('Server started on port 3000..');
});
