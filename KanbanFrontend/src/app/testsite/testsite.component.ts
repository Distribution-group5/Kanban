import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-testsite',
  templateUrl: './testsite.component.html',
  styleUrls: ['./testsite.component.css']
})
export class TestsiteComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  

  
  }
  myFunction(){
  let testy = document.getElementById("textfield1").value;
  console.log(testy);
  document.getElementById("demo").innerHTML = testy;

}
  
}
