const fs = require('fs');

module.exports = {
    getProd:(req,res)=>{
        let sql = `select * from products`;
        con.query(sql, (err, result) => {
            if (err) console.log(err);
            res.send(JSON.stringify(result));
            con.end;
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
            con.end;
        })
    },
    updateProd: function (req, res, next) {
        var sql = "UPDATE products SET price='" + req.body.price + "',soLuongTon='" + req.body.soLuongTon + "',description='" + req.body.description + "' WHERE id=" + req.body.id + "";

        con.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.json({status: "Updated successfully"});
            con.end;
        })
    },
    deleteProd: function (req, res, next) {
        var sql = "DELETE FROM products WHERE id=" + req.body.id + "";

        con.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.json({status: "Deleted successfully"});
            con.end;
        })
    }
};
