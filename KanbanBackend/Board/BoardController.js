const express = require('express');
const boardRouter = express.Router();
const fs = require('fs');
const mysql = require('mysql');
let dbInfo = fs.readFileSync('./DBInfo.txt', 'utf8');
let dbInfoArray = dbInfo.split(",");

boardRouter.post('/DeleteBoard', function (req, res, next) {
    let boardid = req.query.BoardID;
    console.log("Trying to delete board:", boardid);
    let con = mysql.createConnection({
        host: dbInfoArray[0],
        user: dbInfoArray[1],
        password: dbInfoArray[2],
        database: 'KanbanDatabase'
    });

    con.connect(function (err) {
        if (err) next(err);
        let sql = `DELETE FROM Board WHERE BoardID = ${boardid};`;
        console.log("Connected!");
        con.query(sql, function (err, result) {
            if (err) next(err)
            else {
                console.log(`Delete board: ${boardid} complete`);
                res.status(200).send(`Board deleted`);
            }
        });
    });

});

boardRouter.post('/InviteToBoard', function (req, res, next) {
    let boardid = req.body.BoardID;
    let username = req.body.Username;
    console.log(`Inviting to board: ${boardid} user: ${username}`);
    let con = mysql.createConnection({
        host: dbInfoArray[0],
        user: dbInfoArray[1],
        password: dbInfoArray[2],
        database: 'KanbanDatabase'
    });

    con.connect(function (err) {
        if (err) next(err);
        let sql = `INSERT INTO UserBoardRelation VALUES ('${username}', '${boardid}');`;
        console.log("Connected!");
        con.query(sql, function (err, result) {
            if (err) next(err)
            else {
                console.log(`Inviting to board: ${boardid} user: ${username} complete`);
                res.status(200).send(`User invited`);
            }
        });
    });

});

boardRouter.post('test', function (req, res) {
    
    console.log('test message recived');
    console.log(req.body)
    res.send("Can ye hear me?")

});




module.exports = boardRouter;