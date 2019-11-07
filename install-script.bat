CD ./KanbanBackend
CALL npm install
CALL npm audit fix

CD ../KanbanFrontend
CALL npm install
CALL npm audit fix
