const DBConnection = require('./DatabaseConnection');

/* Populate users
for (let i = 1; i < 30; i++) {
    let sql = `INSERT INTO Users VALUES ('user${i}', 'password${i}')`;
    DBConnection.executeQuery(sql);
}
*/

/* Populate boards
for (let i = 1; i < 10; i++) {
    let sql = `INSERT INTO Board VALUES ('${i}', 'Board${i}', 5)`;
    DBConnection.executeQuery(sql);
}
*/

/* Populate cards*/
let counter = 0;
for (let i = 1; i < 10; i++) {
    for (let j = 0; j < 5; j++) {
        for (let k = 0; k < 3; k++) {
            let sql = `INSERT INTO BoardCard(BoardID, CardID, ColumnNo, RowNo, Title, Content, Assignees, DateCreated) VALUES ('${i}', '${counter++}', '${j}', '${k}', 'Board${i}-${j}-${k}', 'test', 'user1', '2010-10-03')`;
            DBConnection.executeQuery(sql);
        }
    }
}

    //Boardid;
    //cardId
    //ColumnNo
    //RowNo
    //Title;
    //Content;
    //Assignees;
    //DateCreated;
    //DateClosed;