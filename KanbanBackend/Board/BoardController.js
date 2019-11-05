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

boardRouter.get('/GetBoards', function (req, res, next) {
    let username = req.query.username;
    console.log("Trying to get boards for:", username);
    let con = mysql.createConnection({
        host: dbInfoArray[0],
        user: dbInfoArray[1],
        password: dbInfoArray[2],
        database: 'KanbanDatabase'
    });

    con.connect(function (err) {
        if (err) next(err);
        let sql = `SELECT ubr.*, board.* FROM UserBoardRelation ubr LEFT JOIN Board board on ubr.BoardID = board.BoardID WHERE ubr.Username = '${username}';`;
        console.log("Connected!");
        con.query(sql, function (err, result) {
            if (err) next(err)
            else {
                console.log(`get boards for: ${username} complete`);
                
                res.status(200).send(result);
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




module.exports = boardRouter;