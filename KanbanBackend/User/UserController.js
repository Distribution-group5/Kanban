var express = require('express');
var userRouter = express.Router();
const fs = require('fs');
const mysql = require('mysql');
let dbInfo = fs.readFileSync('./DBInfo.txt', 'utf8');
let dbInfoArray = dbInfo.split(",");
const bcrypt = require('bcrypt');
const saltRounds = 10;

userRouter.put('/CreateUser', function (req, res, next) {
    let username = req.body.Username;
    let password = req.body.Password;
    console.log("Creating new user:", username);
    let hashedpassword = "";
    bcrypt.hash(password, saltRounds, function(err, hash){
        hashedpassword = hash;
        })
    let con = mysql.createConnection({
        host: dbInfoArray[0],
        user: dbInfoArray[1],
        password: dbInfoArray[2],
        database: 'KanbanDatabase'
    });

    con.connect(function (err) {
        if (err) next(err);
        let sql = `INSERT INTO Users VALUES ('${username}', '${hashedpassword}');`;
        console.log("Connected!");
        con.query(sql, function (err, result) {
            if (err){
                console.log('USER ALREADY EXISTS')
            }
            else {
                console.log(`User created: ${username}`);
                //I have changed the method under to send a json object back
                res.send({ username: `${username}` })
            }
        });
    });
});

userRouter.post('/login', function (req, res, next){
    //console.log(req.body)
    let username = req.body.username;
    let password = req.body.password;
    let testpassword = "";
    console.log("Connecting to database:");
    let con = mysql.createConnection({
        host: dbInfoArray[0],
        user: dbInfoArray[1],
        password: dbInfoArray[2],
        database: 'KanbanDatabase'
    });
    con.connect(function(err){
        console.log(req.body)
        if (err) next (err)
        let sql = `SELECT * FROM Users WHERE username = '${username}'`;
        // AND password = '${password}'`;
        console.log(sql)

        
        con.query(sql, function(err, result, fields){
            if(err) next(err)
        else{
            if(result.length > 0){
                testpassword = result[0].Password;
                bcrypt.compare(password, testpassword, function(err, result) {
                    console.log("Right password? " + result)
                    if(result === true){
                        res.send({ username: `${username}` })
                        console.log("Sending 200 back")
                    }
                    else{
                        res.status(403).send()
                        console.log("Sending 403 back")
                    }
                })
               

            }
            else{
                res.status(403).send()
                console.log("Sending 403 back")
            }
        }
    });
});
//console.log("REQUEST GOTTEN DATA IS: " + username + ": " + password)

});





module.exports = userRouter;