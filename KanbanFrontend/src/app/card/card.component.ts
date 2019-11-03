import { Component, OnInit, Input, NgModule, Output, EventEmitter } from '@angular/core';
import { KanbanCard } from '../board/board.component';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css']
})

export class CardComponent implements OnInit {

    @Input() card: KanbanCard;
    @Output() cardUpdate = new EventEmitter<KanbanCard>();

    raiseCardUpdate() {
        console.log("Changed occured");
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

