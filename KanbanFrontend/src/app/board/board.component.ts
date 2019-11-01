import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  kanbanBoard = new KanbanBoard(1, "Example", [
    [new KanbanCard(1, "Card1 title", "This is the content1", ["Bob", "Berta"], Date.now(), Date.now()), new KanbanCard(3, "Card3 title", "This is the content3", ["Kurt", "Troels"], Date.now(), Date.now())], 
    [new KanbanCard(2, "Card2 title", "content2", ["Niels", "Hans"], Date.now(), Date.now())],
    [new KanbanCard(2, "Card4 title", "content4", ["John"], Date.now(), Date.now())]]);


  constructor() { }

  ngOnInit() {
  }

}

export class KanbanBoard {
  id: number;
  Title: string;
  Columns: Array<Array<KanbanCard>>;

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

export class KanbanCard {
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

  toString(){
    return "ID: "+ this.id + 
    " Title: " + this.Title + 
    " Content: " + this.Content + 
    " Assignees: " + this.Assignees + 
    " Date created: " + this.DateCreated + 
    " Date closed: " + this.DateClosed; 
  }
}