import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  kanbanBoard;

  constructor() { }

  ngOnInit() {
    class KanbanBoard {
      id: number;
      Title: string;
      Columns: [[]];

      constructor(id, Title, Columns) {
        this.id = id;
        this.Title = Title;
        this.Columns = Columns;
      }

      get NumberOfColumns() {
        return this.Columns.length;
      }

      get NumberOfRows() {
        let MaxRows = 0;
        this.Columns.forEach(x => { if (x.length > MaxRows) MaxRows = x.length });
        return MaxRows;
      }

      readJson(json) {
        Object.assign(this, json);
      }
    }

    class KanbanCard {
      id: number;
      Title: string;
      Content: string;
      Assignees: string[];
      DateCreated: Date;
      DateClosed: Date;

      constructor(id, Title, Content, Assignees, DateCreated, DateClosed) {
        this.id = id;
        this.Title = Title;
        this.Content = Content;
        this.Assignees = Assignees;
        this.DateCreated = DateCreated;
        this.DateClosed = DateClosed;
      }
    }

    this.kanbanBoard = new KanbanBoard(1, "Example", [new KanbanCard(1, "E", "", [], Date.now(), Date.now())]);
  }

}
