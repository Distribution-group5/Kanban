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
        //boards.forEach(x => saveBoard(x.BoardObject));
    }, 60000);

    wsserver.on('connection', ws => {
        console.log('New client connected');
        ws.on('message', msg => {
            try {
                const parsedMsg = JSON.parse(msg);
                if (parsedMsg.messageType === 'InitialMessage') {
                    console.log("before getBoard");
                    let targetBoardID = parsedMsg.BoardID;
                    let foundBoard;
                    if (boards[targetBoardID] != undefined) {
                        foundBoard = boards[targetBoardID].BoardObject;
                    }
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
                                    let boardAsString;
                                    try {
                                        
                                        Object.keys(result).forEach(function (key) {
                                            var row = result[key];
                                            boardAsString = row.BoardObject;
                                        });
                                        b = Object.assign(new Kanban.Board(), JSON.parse(boardAsString));
                                        boardAsString = JSON.stringify(b);
                                    } catch (e) {
                                        b = new Kanban.Board(targetBoardID);
                                        boardAsString = JSON.stringify(b);
                                    }
                                    boards[b.id] = { BoardObject: b, BoardAsString: boardAsString };
                                    ws.send(JSON.stringify(boards[targetBoardID].BoardObject));
                                }
                            });
                        });
                    } else {
                        let resultString = JSON.stringify(foundBoard);
                        ws.send(resultString);
                    }
                } else {
                    console.log("Ive recieved the new board");
                    console.log("Length of board object: ", parsedMsg.newBoardState.length);
                    
                    let boardStateDiff = JSON.parse(parsedMsg.newBoardState);
                    let currentBoardStateAsString = boards[boardStateDiff.id].BoardAsString;
                    //console.log("");
                    //console.log("Current:", currentBoardStateAsString);
                    //console.log("");
                    let beforePartToRemove = currentBoardStateAsString.slice(0, boardStateDiff.first);
                    //console.log("beforePartToRemove: \n", beforePartToRemove);
                    let afterPartToRemove = currentBoardStateAsString.slice(currentBoardStateAsString.length - boardStateDiff.last + 1);
                    //console.log("\nDiff:\n", boardStateDiff.diff);
                    //console.log("\nafterPartToRemove:\n", afterPartToRemove)
                    let newBoardStateAsString = beforePartToRemove + boardStateDiff.diff + afterPartToRemove;

                    //console.log("Trying to parse[91]:", newBoardStateAsString);
                    const newBoardState = JSON.parse(newBoardStateAsString);

                    boards[boardStateDiff.id].BoardAsString = newBoardStateAsString;
                    Object.assign(boards[boardStateDiff.id].BoardObject, newBoardState);
                    connectedClients.forEach(x => {
                        if (x.Board === newBoardState.id) {
                            x.WebSocket.send(parsedMsg.newBoardState);
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
                    console.log('Could not save. We should probably do something about this. Oh well... ¯\_(**)_/¯', err);
                }
                else {
                    console.log("Board saved");
                }
            });
        });
    } catch (e) {
        console.log('Could not save. We should probably do something about this. Oh well... ¯\_(**)_/¯');
    }
}


module.exports = { startWebsocket }


