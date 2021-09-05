const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');
app.use(bodyparser.json());
const dbConfig = require('./database/db.config');

const {getProd, insertProd, updateProd, deleteProd} = require('./routes/product');
const {getUser, insertUser, updateUser, changePass, deleteUser} = require('./routes/user');

const config = ({
    host       : dbConfig.host,
    port       : dbConfig.port || 3306,
    user       : dbConfig.user,
    password   : dbConfig.password,
    database   : dbConfig.database,
    dialect    : dbConfig.dialect,
    native     : true,
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

const PORT = process.env.PORT || 3306;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}.`);
});
