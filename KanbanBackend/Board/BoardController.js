var express = require('express');
var boardRouter = express.Router();

boardRouter.post('/DeleteBoard', function (req, res) {
    /Board/DeleteBoard?BoardID="board jeg gerne vil slette" 
});

boardRouter.post('/InviteToBoard', function (req, res) {
    res.send("Hej!");
});




module.exports = boardRouter;