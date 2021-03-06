let connectedClients = [];
const fs = require('fs');
const mysql = require('mysql');
let dbInfo = fs.readFileSync('./DBInfo.txt', 'utf8');
let dbInfoArray = dbInfo.split(",");
const Kanban = require('./DataStructures.js');
const { Server } = require('ws');

let startWebsocket = function () {
    let wsserver = new Server({ port: 40, path: '/Board' });

    let boards = [
        //new Kanban.Board(1, "Example", [
        //    [new Kanban.Card(1, "Card1 title", "This is the content1", ["Bob", "Berta"], new Date(Date.now()), new Date(Date.now())), new Kanban.Card(3, "Card3 title", "This is the content3", ["Kurt", "Troels"], new Date(Date.now()), new Date(Date.now())), new Kanban.Card(6, "Card6 title", "This is the content6", ["Kurt", "Troels"], new Date(Date.now()), new Date(Date.now())), new Kanban.Card(7, "Card7 title", "This is the content7", ["Kurt", "Troels"], new Date(Date.now()), new Date(Date.now()))],
        //    [new Kanban.Card(2, "Card2 title", "content2", ["Niels", "Hans"], new Date(Date.now()), new Date(Date.now())), new Kanban.Card(9, "Card9 title", "This is the content9", ["Kurt", "Troels"], new Date(Date.now()), new Date(Date.now())), new Kanban.Card(10, "Card10 title", "This is the content10", ["Kurt", "Troels"], new Date(Date.now()), new Date(Date.now()))],
        //    [new Kanban.Card(4, "Card4 title", "content4", ["John"], new Date(Date.now()), new Date(Date.now()))],
        //    [new Kanban.Card(5, "Card5 title", "content5", ["Johnny"], new Date(Date.now()), new Date(Date.now())), new Kanban.Card(11, "Card11 title", "This is the content11", ["Kurt", "Troels"], new Date(Date.now()), new Date(Date.now()))]
        //])
    ];


    setInterval(() => {
        boards.forEach(x => saveBoard(x));
    }, 60000);

    wsserver.on('connection', ws => {
        console.log('New client connected');
        ws.on('message', msg => {
            try {
                const parsedMsg = JSON.parse(msg);
                if (parsedMsg.messageType === 'InitialMessage') {
                    console.log("before getBoard");
                    let targetBoardID = parsedMsg.BoardID;
                    let foundBoard = boards.find(x => x.id === targetBoardID);
                    connectedClients.push({ Board: targetBoardID, WebSocket: ws });
                    console.log("foundBoard: " + foundBoard);
                    if (foundBoard === undefined) {
                        console.log("getBoard called");
                        let con = mysql.createConnection({
                            host: dbInfoArray[0],
                            user: dbInfoArray[1],
                            password: dbInfoArray[2],
                            database: 'KanbanDatabase'
                        });

                        con.connect(function (err) {
                            if (err) next(err);
                            let sql = `SELECT BoardObject FROM Board WHERE BoardID = ${targetBoardID}`;
                            con.query(sql, function (err, result) {
                                if (err) {
                                    console.log("Error getting board: ", err);
                                }
                                else {
                                    console.log("Gotten board");
                                    let b;
                                    try {
                                        let boardAsString;
                                        Object.keys(result).forEach(function (key) {
                                            var row = result[key];
                                            boardAsString = row.BoardObject;
                                        });
                                        b = Object.assign(new Kanban.Board(), JSON.parse(boardAsString));
                                    } catch (e) {
                                        b = new Kanban.Board(targetBoardID);
                                    }
                                    boards.push(b);
                                    ws.send(JSON.stringify(boards.find(x => x.id === targetBoardID)));
                                }
                            });
                        });
                    } else {
                        let resultString = JSON.stringify(foundBoard);
                        ws.send(resultString);
                    }
                } else {
                    console.log("Ive recieved the new board")
                    const newBoardState = JSON.parse(parsedMsg.newBoardState);
                    let currentBoardState = boards.find(x => x.id === newBoardState.id);
                    Object.assign(currentBoardState, newBoardState);
                    connectedClients.forEach(x => {
                        if (x.Board === newBoardState.id) {
                            x.WebSocket.send(JSON.stringify(newBoardState));
                        }
                    });
                }
            } catch (error) {
                console.log(`The following message caused an error: ${msg} \n The error: ${error.message}`);
                ws.send("An error occured");
            }
        });



        ws.on('close', (code, msg) => {
            console.log("Connection closing:", code, msg);
        });

        ws.onerror = function (event) {
            console.log(`An error occured. ${ws._socket.remoteAddress} caused the following error: ${event.message}`);
        }
    });
}

function saveBoard(board) {
    console.log(board);
    let boardAsJSON = JSON.stringify(board);
    let con = mysql.createConnection({
        host: dbInfoArray[0],
        user: dbInfoArray[1],
        password: dbInfoArray[2],
        database: 'KanbanDatabase'
    });

    try {
        con.connect(function (err) {
            if (err) console.log(err);
            let sql = `UPDATE Board SET BoardObject = '${boardAsJSON}' WHERE BoardID = ${board.id}`;
            con.query(sql, function (err, result) {
                if (err) {
                    console.log('Could not save. We should probably do something about this. Oh well... �\_(**)_/�', err);
                }
                else {
                    console.log("Board saved");
                }
            });
        });
    } catch (e) {
        console.log('Could not save. We should probably do something about this. Oh well... �\_(**)_/�');
    }
}


module.exports = { startWebsocket }


