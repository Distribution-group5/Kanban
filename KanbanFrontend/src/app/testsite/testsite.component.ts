import { Component, OnInit } from '@angular/core';
import { WebsocketService } from "../websocket.service";
import { TestcommunicationService } from "../testcommunication.service"


@Component({
  selector: 'app-testsite',
  templateUrl: './testsite.component.html',
  styleUrls: ['./testsite.component.css'],
  providers: [WebsocketService, TestcommunicationService]
})
export class TestsiteComponent implements OnInit {

  constructor(private testCommunicationService: TestcommunicationService) {  
    testCommunicationService.messages.subscribe(msg => {
      console.log("Response from websocket: " + msg)

    });

  }

  private message = {
    author: "tutorialedge",
    message: "this is a test message"
  };

  sendMsg() {
    console.log("new message from client to websocket: ", this.message);
    this.testCommunicationService.messages.next(this.message);
    this.message.message = "";
  }

  ngOnInit() {
  
  }
  myFunction(){
  let testy = (<HTMLInputElement>document.getElementById("textfield1")).value;
  console.log(testy);
  this.sendMsg();
  document.getElementById("demo").innerHTML = testy;

}
  
}
