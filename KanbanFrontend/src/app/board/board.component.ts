import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  kanbanBoard = new KanbanBoard(1, "Example", [
    [new KanbanCard(1, "Card1 title", "This is the content1", ["Bob", "Berta"], new Date(Date.now()), new Date(Date.now())), new KanbanCard(3, "Card3 title", "This is the content3", ["Kurt", "Troels"], new Date(Date.now()), new Date(Date.now())), new KanbanCard(6, "Card6 title", "This is the content6", ["Kurt", "Troels"], new Date(Date.now()), new Date(Date.now())),new KanbanCard(7, "Card7 title", "This is the content7", ["Kurt", "Troels"], new Date(Date.now()), new Date(Date.now()))], 
    [new KanbanCard(2, "Card2 title", "content2", ["Niels", "Hans"], new Date(Date.now()), new Date(Date.now())),new KanbanCard(9, "Card9 title", "This is the content9", ["Kurt", "Troels"], new Date(Date.now()), new Date(Date.now())), new KanbanCard(10, "Card10 title", "This is the content10", ["Kurt", "Troels"], new Date(Date.now()), new Date(Date.now()))],
    [new KanbanCard(4, "Card4 title", "content4", ["John"], new Date(Date.now()), new Date(Date.now()))],
    [new KanbanCard(5, "Card5 title", "content5", ["Johnny"], new Date(Date.now()), new Date(Date.now())), new KanbanCard(11, "Card11 title", "This is the content11", ["Kurt", "Troels"], new Date(Date.now()), new Date(Date.now()))]
  ]);


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

  get numberOfCards(){
    let amount = 0;
    this.Columns.forEach(x => amount += x.length);
    return amount;
  }

  moveCard(theCard:KanbanCard, direction:String){
    let pushed = false;
    for (let column in this.Columns){
      for(let card in this.Columns[column]){
        if(this.Columns[column][card] === theCard){
          if(pushed === false){
            switch(direction){
              case 'right':
                this.Columns[column].splice(Number(card),1);
                if(Number(column) < this.Columns.length-1){
                  this.Columns[Number(column)+1].splice(Number(card), 0, theCard);
                }else{
                  this.Columns.push([]);
                  this.Columns[Number(column)+1].push(theCard);
                }
                pushed = true;
                break;
              case 'left':
                  if(Number(column) > 0){
                    this.Columns[column].splice(Number(card),1);
                    this.Columns[Number(column)-1].splice(Number(card), 0, theCard);
                    pushed = true;
                  }
                break;
              case 'up':
                  if(Number(card) > 0){
                    this.Columns[column].splice(Number(card),1);
                    this.Columns[Number(column)].splice(Number(card)-1, 0, theCard);
                    pushed = true;
                  }
                break;
              case 'down':
                  if(Number(card) < this.Columns[column].length-1){
                    this.Columns[column].splice(Number(card),1);
                    this.Columns[Number(column)].splice(Number(card)+1, 0, theCard);
                    pushed = true;
                  }
                break;
              default:
                console.log("error in switch");
            }
          }
        }
      }
    }
    //console.log(theCard);
  }

  deleteCard(theCard:KanbanCard){
    for (let column in this.Columns){
      for(let card in this.Columns[column]){
        if(this.Columns[column][card] === theCard){
          this.Columns[column].splice(Number(card),1);
        }
      }
    }
  }

  createCard(column:number){
    let c = new KanbanCard(this.numberOfCards+1, "Card Title", "","",new Date(), new Date());
    if(column < this.Columns.length){
      this.Columns[column][this.Columns[column].length] = c;
    }else{
      this.Columns.push([]);
      this.Columns[column][0] = c;
    }
    
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