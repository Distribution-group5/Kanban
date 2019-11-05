
let startWebsocket = function () {
    const { Server } = require('ws');
    const Kanban = require('./DataStructures.js');

    let wsserver = new Server({ port: 40, path: '/Board' });

    let boards = [
        new KanbanBoard(1, "Example", [
            [new KanbanCard(1, "Card1 title", "This is the content1", ["Bob", "Berta"], new Date(Date.now()), new Date(Date.now())), new KanbanCard(3, "Card3 title", "This is the content3", ["Kurt", "Troels"], new Date(Date.now()), new Date(Date.now())), new KanbanCard(6, "Card6 title", "This is the content6", ["Kurt", "Troels"], new Date(Date.now()), new Date(Date.now())),new KanbanCard(7, "Card7 title", "This is the content7", ["Kurt", "Troels"], new Date(Date.now()), new Date(Date.now()))], 
            [new KanbanCard(2, "Card2 title", "content2", ["Niels", "Hans"], new Date(Date.now()), new Date(Date.now())),new KanbanCard(9, "Card9 title", "This is the content9", ["Kurt", "Troels"], new Date(Date.now()), new Date(Date.now())), new KanbanCard(10, "Card10 title", "This is the content10", ["Kurt", "Troels"], new Date(Date.now()), new Date(Date.now()))],
            [new KanbanCard(4, "Card4 title", "content4", ["John"], new Date(Date.now()), new Date(Date.now()))],
            [new KanbanCard(5, "Card5 title", "content5", ["Johnny"], new Date(Date.now()), new Date(Date.now())), new KanbanCard(11, "Card11 title", "This is the content11", ["Kurt", "Troels"], new Date(Date.now()), new Date(Date.now()))]
          ])
    ];
    let connectedClients = [];

    wsserver.on('connection', ws => {
        console.log('New client connected');
        ws.on('message', msg => {
            try {
                const parsedMsg = JSON.parse(msg);
                if (parsedMsg.messageType === 'InitialMessage') {
                    connectedClients.push({ Board: parsedMsg.BoardID, WebSocket: ws });
                    ws.send(JSON.stringify(boards.find(x => x.id === parsedMsg.BoardID)));
                } else {
                    const newBoardState = JSON.parse(parsedMsg.newBoardState);
                    let currentBoardState = boards.find(x => x.id === newBoardState.id);
                    currentBoardState.readJson(newBoardState);
                    connectedClients.forEach(x => {
                        if (x.Board === newBoardState.id) {
                            x.ws.send(JSON.stringify(newBoardState));
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

module.exports = {startWebsocket}


