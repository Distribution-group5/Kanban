const express = require('express');
const boardRouter = express.Router();
const DBConnectionClass = require('../DatabaseConnection');
let Connection = DBConnectionClass.connection;

boardRouter.post('/DeleteBoard', function (req, res) {
   
});

boardRouter.post('/InviteToBoard', function (req, res) {
    res.send("Hej!");
});




module.exports = boardRouter;