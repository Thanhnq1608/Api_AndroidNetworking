module.exports = {
    getProd:(req,res)=>{
        let sql = `select * from products`;
        con.query(sql, (err, result) => {
            if (err) console.log(err);
            res.send(JSON.stringify(result));
            con.end;
        })
    },
    insertProd: function (req, res) {
        var avatar = req.body.avatar;
        var name = req.body.name;
        var price = req.body.price;
        var inventory = req.body.inventory;
        var description = req.body.description;

        var sql = `INSERT INTO products(avatar,name,price,inventory,description) VALUES("${avatar}","${name}","${price}","${inventory}","${description}")`;

        con.query(sql, function (err, result) {
            if (err) throw err;
            res.json({status: 'Insert Success'});
            con.end;
        })
    },
    updateProd: function (req, res, next) {
        var sql = "UPDATE products SET price='" + req.body.price + "',inventory='" + req.body.inventory + "',description='" + req.body.description + "' WHERE id=" + req.body.id + "";

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
