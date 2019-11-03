const webSocket = require('./Board/BoardWebSocket.js');
const express = require('Express');
const cors = require('cors');
const app = express();
const boardController = require('./Board/BoardController.js');
const userController = require('./User/UserController.js');

console.log("It is starting O.o");

webSocket.startWebsocket();
app.use(cors());
app.use(express.json());
app.use('/Board', boardController);
app.use('/User', userController);

app.listen(8080);
