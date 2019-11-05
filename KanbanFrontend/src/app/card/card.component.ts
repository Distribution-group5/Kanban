import { Component, OnInit, Input, NgModule, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { KanbanCard, KanbanBoard, BoardComponent } from '../board/board.component';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css']
})
@NgModule({
    imports: [
    FormsModule]
    })

export class CardComponent implements OnInit {

    @Input() card: KanbanCard;
    @Output() cardUpdate = new EventEmitter<KanbanCard>();
    boardComponent = new BoardComponent();
    raiseCardUpdate() {
        this.boardComponent.boardChanged
        //console.log(this.card);
        this.cardUpdate.emit(this.card);
    }

    autogrow(element) {
        element.target.style.height = "0px";
        element.target.style.height = (element.target.scrollHeight + 25) + "px";
    }


    constructor() {
    }

    ngOnInit() {
    }

   
}

