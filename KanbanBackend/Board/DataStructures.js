class KanbanBoard {
    //id;
    //Title;
    //Columns;

    constructor(id, Title, Columns) {
        this.id = id;
        this.Title = Title;
        this.Columns = Columns;
    }

    get NumberOfColumns() {
        return Columns.length;
    }

    get NumberOfRows() {
        let MaxRows = 0;
        Columns.forEach(x => { if (x.length > MaxRows) MaxRows = x });
        return MaxRows;
    }

    readJson(json) {
        Object.assign(this, json);
    }
}

class KanbanCard {
    //id;
    //Title;
    //Content;
    //Assignees;
    //DateCreated;
    //DateClosed;

    constructor(id, Title, Content, Assignees, DateCreated, DateClosed) {
        this.id = id;
        this.Title = Title;
        this.Content = Content;
        this.Assignees = Assignees;
        this.DateCreated = DateCreated;
        this.DateClosed = DateClosed;
    }
}

module.exports = {
    Board: KanbanBoard,
    Card: KanbanCard
};