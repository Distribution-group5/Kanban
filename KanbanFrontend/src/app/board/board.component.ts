import { Component, OnInit} from '@angular/core';
import { send } from 'q';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  WebSocket1: WebSocket
  kanbanBoard = new KanbanBoard();

  constructor() {
  }
  
   methodInvoked(data){
    //console.log("CALLBACK VIRKER" + data);
    let data1 = JSON.parse(data);
    this.kanbanBoard = Object.assign(new KanbanBoard(), data1);
    //console.log(this.kanbanBoard);
    //this.kanbanBoard = data1;
  }
   
  ngOnInit() {
    this.WebSocket1 = new WebSocket("ws://localhost:40/Board");
    let datatosend = JSON.stringify({messageType: "InitialMessage", BoardID: 1});
    
    
    this.WebSocket1.onmessage = event =>{
      //console.log(event.data);
      this.methodInvoked(event.data)
      //console.log("hej");
      };
    this.WebSocket1.onopen = () => this.WebSocket1.send(datatosend);
  }

  boardChanged(){
    let kanbanBoard = JSON.stringify(this.kanbanBoard);
    let datatosend = JSON.stringify({messageType: "hello", newBoardState: kanbanBoard});
    this.WebSocket1.send(datatosend);
    }

    timeout = null;
    delayedboardChanged(){
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.boardChanged();
      }, 1000);
    }
  }   


 export class KanbanBoard {
  id: number;
  Title: string;
  Columns: Array<Array<KanbanCard>>;

  constructor(){}


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