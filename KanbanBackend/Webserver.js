const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const kanbanBoards = {};

io.on("connection", socket => {
    let previousId;
    const safeJoin = currentId => {
        socket.leave(previousId)
        socket.join(currentId, () => console.log(`Socket ${socket.id} joined room ${currentId}`));
        previousId = currentId;
    }

    socket.on("getKanbanBoard", kanBanId => {
        safeJoin(kanBanId);
        socket.emit("board", kanbanBoards[kanBanId]);
        
    });

    socket.on("editKanbanBoard", kanBoard => {
        kanbanBoards[kanBoard.id] = kanBoard;
        socket.to(kanBaord.id).emit("board", kanBoard);
    });

    io.emit('kanbanBoards', Object.keys(kanbanBoards));

    
});

http.listen(4444, () => {
    console.log('listening on port 4444');
});