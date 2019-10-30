import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  onClickSubmit(formData){
    alert('Your username is: ' + formData.username + "password:" + formData.password);
      let req = new XMLHttpRequest();
      req.open("POST", "http://localhost:8080/login/"); // optional 3rd arg
      req.send("username is: " + formData.username + "password is: " + formData.password);
    }

}

export class TestClass{
  onClickSubmit(formData){
  alert('Your username is: ' + formData.username);
  }
  //async loginTestMethod(Username: string, Password: String){
    //let req = new XMLHttpRequest();
        //req.open("POST", "http://localhost:8080/login/"); // optional 3rd arg
        //req.send("TESTDATAHEJ");
  //}
}
