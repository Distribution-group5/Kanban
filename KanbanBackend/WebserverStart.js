const webSocket = require('./Board/BoardWebSocket.js');
const express = require('Express');
const app = express();
const DBConnection = require('./DatabaseConnection.js');
const boardController = require('./Board/BoardController.js');
const userController = require('./User/UserController.js');

console.log("It is starting O.o");

DBConnection.startDBConnection();
webSocket.startWebsocket();

app.use('/Board', boardController);
app.use('/User', userController);

app.listen(8080);