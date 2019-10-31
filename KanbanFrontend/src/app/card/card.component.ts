import { Component, OnInit, Input } from '@angular/core';
import { KanbanCard} from '../board/board.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  
  @Input() card: KanbanCard;
  


  constructor() {
    
   }

  ngOnInit() {
  }

}
