var http = require('http');
var https = require('https');
var fs = require('fs');
var privateKey  = fs.readFileSync('sslcert/server.key', 'utf8');
var certificate = fs.readFileSync('sslcert/server.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};
const webSocket = require('./Board/BoardWebSocket.js');
const express = require('Express');
const cors = require('cors');
const app = express();
const boardController = require('./Board/BoardController.js');
const userController = require('./User/UserController.js');
var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);
console.log("It is starting O.o");

webSocket.startWebsocket();
app.use(cors());
app.use(express.json());
app.use('/Board', boardController);
app.use('/User', userController);
httpServer.listen(8080);
httpsServer.listen(8443);
//app.listen(8080);



