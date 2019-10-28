const { Server } = require('ws');
const Kanban = require('./DataStructures.js');

let wsserver = new Server({ port: 80, path: '/Board' });

let boards = [
    new Kanban.Board(1, "Test1", [
        [new Kanban.Card(1, 'Card1', 'This is card one', 'None', Date.now(), Date.now() + 1000000),
        new Kanban.Card(2, 'Card2', 'This is card two', 'None', Date.now(), Date.now() + 1000000)
        ],
        [new Kanban.Card(1, 'Card1', 'This is card one', 'None', Date.now(), Date.now() + 1000000),
        new Kanban.Card(2, 'Card2', 'This is card two', 'None', Date.now(), Date.now() + 1000000)
        ]
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
})


