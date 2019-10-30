import { Injectable } from '@angular/core';
import { Observable, Subject } from "rxjs";
import { WebsocketService } from "./websocket.service";
import { map } from "rxjs/operators"

const SERVER_URL = "ws:localhost:4200";

export interface Message {
  author: string;
  message: string;
}


@Injectable({
  providedIn: 'root'
})
export class TestcommunicationService {
  public messages: Subject<Message>;

  constructor(wsService: WebsocketService) {
    this.messages = <Subject<Message>>wsService.connect(SERVER_URL).pipe(map(
      (response: MessageEvent): Message => {
        let data = JSON.parse(response.data);
        return {
          author: data.author,
          message: data.message
        };
      }
    ));
   }
}
