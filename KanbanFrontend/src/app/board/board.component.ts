import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  kanbanBoard = new KanbanBoard(1, "Example", [
    [new KanbanCard(1, "Card1 title", "This is the content1", ["Bob", "Berta"], new Date(Date.now()), Date.now()), 
        new KanbanCard(3, "Card3 title", "This is the content3", ["Kurt", "Troels"], Date.now(), Date.now()), 
        new KanbanCard(6, "Card6 title", "This is the content6", ["Kurt", "Troels"], Date.now(), Date.now()),
        new KanbanCard(7, "Card7 title", "This is the content7", ["Kurt", "Troels"], Date.now(), Date.now()), 
        new KanbanCard(8, "Card8 title", "This is the content8", ["Kurt", "Troels"], Date.now(), Date.now()), 
        new KanbanCard(12, "Card12 title", "This is the content12", ["Kurt", "Troels"], Date.now(), Date.now())], 
    [new KanbanCard(2, "Card2 title", "content2", ["Niels", "Hans"], Date.now(), Date.now()),
        new KanbanCard(9, "Card9 title", "This is the content9", ["Kurt", "Troels"], Date.now(), Date.now()), 
        new KanbanCard(10, "Card10 title", "This is the content10", ["Kurt", "Troels"], Date.now(), Date.now())],
    [new KanbanCard(4, "Card4 title", "content4", ["John"], Date.now(), Date.now())],
    [new KanbanCard(13, "Card12", "This is the content is it", ["Nick", "oh my Nick again"], Date.now(), Date.now())],
    [new KanbanCard(5, "Card5 title", "content5", ["Johnny"], Date.now(), Date.now()), 
        new KanbanCard(11, "Card11 title", "This is the content11", ["Kurt", "Troels"], Date.now(), Date.now())]
    ]);

  constructor() {

    
   }

  ngOnInit() {
    
  }

  saveCard(theCard:KanbanCard){
    console.log("hello0")
    //this.kanbanBoard.getKanbancard(theCard);
    for(let column in this.kanbanBoard.Columns){
      for(let card in this.kanbanBoard.Columns[column]){
        if(this.kanbanBoard.Columns[column][card].id === theCard.id){
          console.log("yay")
          console.log(this.kanbanBoard.Columns[column][card].id);
          this.kanbanBoard.Columns[column][card] = theCard;
          console.log("Yay??")
        }
      }
    }
    console.log("hello2")
  }
  myFunction(){
    let testy = (<HTMLInputElement>document.getElementById("textfield1")).value;
    console.log(testy);
    document.getElementById("demo").innerHTML = testy;
    
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

  moveCard(theCard:KanbanCard/* , column:number, row:number */){
    // this.Columns[0].splice(0,1);
    
    //console.log(theCard);
    
  }

  readJson(json) {
    Object.assign(this, json);
  }
   
   getKanbancard(theCard:KanbanCard){
     for(let column in this.Columns){
       for(let card in this.Columns[column]){
        //console.log(this.Columns[column][card].id);
         if(this.Columns[column][card].id=== theCard.id){
           console.log("hello0.99")
          console.log(theCard);
          console.log("hello1");
          console.log(this.Columns[column][card]);
          this.Columns[column][card] = theCard;
         }
       }
     }
     
    
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
