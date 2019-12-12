CD ./KanbanBackend
START node WebserverStart.js
CD ../KanbanFrontend
START ng serve --ssl --ssl-cert sslcert/server.crt --ssl-key server.key --open
