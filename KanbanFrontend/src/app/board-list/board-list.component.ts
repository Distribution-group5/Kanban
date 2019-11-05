import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-board-list',
    templateUrl: './board-list.component.html',
    styleUrls: ['./board-list.component.css']
})
export class BoardListComponent implements OnInit {

    BoardList = [];

    openBoard() {
        window.location.href = "localhost:4200/kanbanboard";
        console.log("Hallejua!");
    }

    constructor(private cookie: CookieService) { }

    async ngOnInit() {
        let username = this.cookie.get("data");
        async function getData(url = '') {
            //Response is what the fetch gets. Await means it will only return once there's a response.
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            try {
                //We turn the response into an json object
                return await response.json();
            }
            catch (error) {
                //We return undefined if the server didn't find a match with user+pass
                return undefined
            }
        }

        const boards = await getData('http://localhost:8080/Board/GetBoards?username=' + username);
        if (boards != undefined) {
            let counter = 0;
            console.log(boards[0].BoardID);
            while (true) {
                if (boards[counter] == undefined) break;
                this.BoardList.push({ BoardID: boards[counter].BoardID, Title: boards[counter++].Title });
            }
        }
    }

}

