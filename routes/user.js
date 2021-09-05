
module.exports ={
    getUser:(req,res)=>{
        let sql = `select * from users`;
        con.query(sql, (err, result) => {
            var users = [];
            if (err) throw err;
            for (var i = 0; i < result.length; i++) {
                users.push({
                    id: result[i].id,
                    username: result[i].username,
                    password: result[i].password,
                    phonenumber: result[i].phonenumber,
                    gmail: result[i].gmail,
                });
            }
            res.send(JSON.stringify(users));
            con.end;
        })
    },
    insertUser:function (req,res){
        var username=req.body.username;
        var password = req.body.password;
        var phonenumber = req.body.phonenumber;
        var gmail = req.body.gmail;

        var sql = `INSERT INTO users(username,password,phonenumber,gmail) VALUES("${username}","${password}","${phonenumber}","${gmail}")`;

        con.query(sql, function (err, result) {
            if (err) throw err;
            res.json({'status': 'succes', id: result.insertId});
            con.end;
        })
    },
    updateUser:function (req,res){
        var sql ="UPDATE users SET password='"+req.body.password+"',phonenumber='"+req.body.phonenumber+"',gmail='"+req.body.gmail+"' WHERE id="+req.body.id+"";

        con.query(sql,function (err, result,fields){
            if (err) throw err;
            res.json({status:"Updated successfully"});
            con.end;
        })
    },
    changePass:function (req,res){
        var sql ="UPDATE users SET password='"+req.body.password+"' WHERE id="+req.body.id+"";

        con.query(sql,function (err, result,fields){
            if (err) throw err;
            res.json({status:"Updated successfully"});
            con.end;
        })
    },
    deleteUser:function (req,res){
        var sql ="DELETE FROM users WHERE id="+req.body.id+"";

        con.query(sql,function (err, result,fields){
            if (err) throw err;
            res.json({status:"Deleted successfully"});
            con.end;
        })
    }
};
