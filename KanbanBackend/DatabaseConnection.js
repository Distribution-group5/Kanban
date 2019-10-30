const fs;
const mysql;
let con;

let startDBConnection = function () {
    fs = require('fs');
    mysql = require('mysql');
    let dbInfo = fs.readFileSync('/DBInfo.txt', 'utf8');
    let dbInfoArray = dbInfo.split(",");


    con = mysql.createConnection({
        host: dbInfoArray[0],
        user: dbInfoArray[1],
        password: dbInfoArray[2]
    });

    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
    });
}

module.exports = {
    startDBConnection = startDBConnection,
    connection = con
}
