var express = require('express');
var userRouter = express.Router();

userRouter.post('/CreateUser', function (req, res) {

});

userRouter.post('/login', function (req, res){
res.send('login connected')
});




module.exports = userRouter;