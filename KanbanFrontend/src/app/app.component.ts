import { Component, OnInit, ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'KanbanFrontend';

  constructor(changeRef: ChangeDetectorRef) { }

  ngOnInit() { }
}
