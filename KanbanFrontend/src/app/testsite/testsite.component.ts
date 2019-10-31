import { Component, OnInit, OnDestroy } from '@angular/core';
import { BoardService } from '../services/board.service';
import { Subscription } from 'rxjs';
import { Board } from '../models/board';
import { startWith } from 'rxjs/operators';


@Component({
  selector: 'app-testsite',
  templateUrl: './testsite.component.html',
  styleUrls: ['./testsite.component.css'],
})
export class TestsiteComponent implements OnInit, OnDestroy {

  board: Board;
  private _docSub: Subscription;
  constructor(private boardService: BoardService) {  }

  ngOnInit() {
    this._docSub = this.boardService.currentBoard.pipe(
      startWith({ id: '',  board: 'bla bla'})
      ).subscribe(board => board = board);
  }

  ngOnDestroy() {
    this._docSub.unsubscribe();
  }

  editKanbanboard(){
    this.boardService.editKanbanBoard(this.board);
  }

  myFunction(){
  let testy = (<HTMLInputElement>document.getElementById("textfield1")).value;
  console.log(testy);
  document.getElementById("demo").innerHTML = testy;

}
  
}
