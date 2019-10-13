const WebSocket = require('ws');

let ws = new WebSocket("ws://localhost:80/Board");

ws.onmessage = event => {
    console.log(event.data);
}

process.stdin.on('data', data => {
    ws.send(data.toString());
    console.log(data.toString());
});