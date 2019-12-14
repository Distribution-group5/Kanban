class KanbanBoard {
    constructor(id = 0, Title = "Title", Columns = []) {
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
  
    moveCard(theCard, direction){
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
  
    deleteCard(theCard){
      for (let column in this.Columns){
        for(let card in this.Columns[column]){
          if(this.Columns[column][card] === theCard){
            this.Columns[column].splice(Number(card),1);
          }
        }
      }
    }
  
    createCard(column){
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

  class KanbanCard { 
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

module.exports = {
    Board: KanbanBoard,
    Card: KanbanCard
};