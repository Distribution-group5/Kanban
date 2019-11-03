let fs;
let mysql;
let con;

let executeQuery = function (query) {
    fs = require('fs');
    mysql = require('mysql');
    let dbResult;
    let dbInfo = fs.readFileSync('./DBInfo.txt', 'utf8');
    let dbInfoArray = dbInfo.split(",");


    con = mysql.createConnection({
        host: dbInfoArray[0],
        user: dbInfoArray[1],
        password: dbInfoArray[2],
        database: 'KanbanDatabase'
    });

    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
        con.query(query, function (err, result) {
            if (err) throw err;
            console.log(`Query complete`);
        });
    });


}

module.exports = {
    executeQuery: executeQuery,
}
