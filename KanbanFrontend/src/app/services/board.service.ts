import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Board } from '../models/board';


@Injectable({
  providedIn: 'root'
})
export class BoardService {
  currentBoard = this.socket.fromEvent<Board>('board');
  boards = this.socket.fromEvent<string[]>('boards');
  constructor(private socket: Socket) { }

  getKanbanBoard(id: string) {
    this.socket.emit('getKanbanBoard', id);
  }

  editKanbanBoard(board: Board) {
    this.socket.emit('editKanbanBoard', board);
  }
}
