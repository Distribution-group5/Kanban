import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import * as jwt_decode from "jwt-decode";

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.css']
})
export class BoardListComponent implements OnInit {
  private token: string;
  private username: string;

  BoardList = [{ BoardID: '', Title: 'No boards found. Either login or create new board' }];

  DeleteBoard(id) {
    let tokenToUse = this.token
    fetch('http://localhost:8080/Board/DeleteBoard?BoardID=' + id, { method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + tokenToUse,
    } });
    window.location.reload();
  }

  CreateBoard(data) {
    let username = this.username
    let tokenToUse = this.token
    fetch(`http://localhost:8080/Board/CreateBoard?username=${username}&title=${data.title}`, { method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + tokenToUse,
    } });
    window.location.reload();
  }

  addExistingBoard(data){
    let username = this.username;
    let tokenToUse = this.token
    fetch(`http://localhost:8080/Board/InviteToBoard?username=${username}&boardid=${data.BoardID}`, { method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + tokenToUse
    } });
    window.location.reload();
  }

  constructor(private cookie: CookieService) { }

  async ngOnInit() {
    this.token = window.localStorage.getItem('Authorization');
    if(window.localStorage.getItem('Authorization') !== undefined &&  this.getDecodedAccessToken(this.token) !== null){

    
    let tokenToUse = this.token
    let decodedToken = this.getDecodedAccessToken(this.token)
    console.log(decodedToken)
    this.username = decodedToken.user;
    console.log('USERNAME IS ' + this.username)
    async function getData(url = '') {
      //Response is what the fetch gets. Await means it will only return once there's a response.
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + tokenToUse
        }
      });
      if(response.status===403){
        window.location.href = 'http://localhost:4200/login';
      }
      try {
        //We turn the response into an json object
        console.log('RESPONSE' + response.status)
        return await response.json();
      }
      catch (error) {
        console.log('RESPONSE' + response.status)
        //We return undefined if the server didn't find a match with user+pass
        return undefined
      }
    }

    const boards = await getData('http://localhost:8080/Board/GetBoards?username=' + this.username);
  
    
    if (boards != undefined) {
      this.BoardList.pop();
      let counter = 0;
      console.log(boards[0].BoardID);
      while (true) {
        if (boards[counter] == undefined) break;
        this.BoardList.push({ BoardID: boards[counter].BoardID, Title: boards[counter++].Title });
      }
    }
  }
  else{
    console.log('Need Correct Token')
    window.location.href = 'http://localhost:4200/login';
  }
}

  getDecodedAccessToken(token: string): any {
    try{
        return jwt_decode(token);
    }
    catch(Error){
        return null;
    }
  }

}

