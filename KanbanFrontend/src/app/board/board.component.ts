import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  kanbanBoard = new KanbanBoard(1, "Example", [
    [new KanbanCard(1, "Card1 title", "This is the content1", ["Bob", "Berta"], Date.now(), Date.now()), new KanbanCard(3, "Card3 title", "This is the content3", ["Kurt", "Troels"], Date.now(), Date.now()), new KanbanCard(6, "Card6 title", "This is the content6", ["Kurt", "Troels"], Date.now(), Date.now()),new KanbanCard(7, "Card7 title", "This is the content7", ["Kurt", "Troels"], Date.now(), Date.now()), new KanbanCard(8, "Card8 title", "This is the content8", ["Kurt", "Troels"], Date.now(), Date.now()), new KanbanCard(12, "Card12 title", "This is the content12", ["Kurt", "Troels"], Date.now(), Date.now())], 
    [new KanbanCard(2, "Card2 title", "content2", ["Niels", "Hans"], Date.now(), Date.now()),new KanbanCard(9, "Card9 title", "This is the content9", ["Kurt", "Troels"], Date.now(), Date.now()), new KanbanCard(10, "Card10 title", "This is the content10", ["Kurt", "Troels"], Date.now(), Date.now())],
    [new KanbanCard(4, "Card4 title", "content4", ["John"], Date.now(), Date.now())],
    [new KanbanCard(5, "Card5 title", "content5", ["Johnny"], Date.now(), Date.now()), new KanbanCard(11, "Card11 title", "This is the content11", ["Kurt", "Troels"], Date.now(), Date.now())]]);


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

  moveCard(theCard:KanbanCard){
    for (let column in this.Columns){
      for(let card in this.Columns[column]){
        if(this.Columns[column][card] === theCard){
          this.Columns[column].splice(Number(card),1);
        }
      }
    }
    
    console.log(theCard);
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