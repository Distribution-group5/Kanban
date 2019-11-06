const WebSocket = require('ws');

let ws = new WebSocket("ws://localhost:80/Board");

ws.onmessage = event => {
    console.log(event.data); //Update KanbanBoard variable after destringifying
}

process.stdin.on('data', data => { //WHen a change occurs notify server
    ws.send(data.toString());
    console.log(data.toString());
});