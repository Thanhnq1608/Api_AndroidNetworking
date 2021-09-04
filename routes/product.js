const fs = require('fs');

module.exports = {
    getProd: (req, res) => {
        let sql = `select * from products`;
        con.query(sql, (err, result) => {
            var products = [];
            if (err) {
                throw console.log(JSON.stringify(err));
                res.json({"Error": 1, "Message": "Error while getting the data from Remote DataBase motherofall.org"});
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
    },
    insertProd: function (req, res, next) {
        var avatar = req.body.avatar;
        var name = req.body.name;
        var price = req.body.price;
        var soLuongTon = req.body.soLuongTon;
        var description = req.body.description;

        var sql = `INSERT INTO products(avatar,name,price,soLuongTon,description) VALUES("${avatar}","${name}","${price}","${soLuongTon}","${description}")`;

        con.query(sql, function (err, result) {
            if (err) throw err;
            res.json({'status': 'succes', id: result.insertId});
        })
    },
    updateProd: function (req, res, next) {
        var sql = "UPDATE products SET price='" + req.body.price + "',soLuongTon='" + req.body.soLuongTon + "',description='" + req.body.description + "' WHERE id=" + req.body.id + "";

        con.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.json({status: "Updated successfully"});
        })
    },
    deleteProd: function (req, res, next) {
        var sql = "DELETE FROM products WHERE id=" + req.body.id + "";

        con.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.json({status: "Deleted successfully"});
        })
    }
};
