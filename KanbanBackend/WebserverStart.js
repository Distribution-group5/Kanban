const webSocket = require('./Board/BoardWebSocket.js');
var express = require('Express');
var app = express();
var boardController = require('./Board/BoardController.js');
var userController = require('./User/UserController.js');

Console.log("It is starting O.o");

webSocket.startWebsocket();

app.use('/Board', boardController);
app.use('/User', userController);

app.listen(80);