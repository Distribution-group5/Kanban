import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  constructor(private cookie:CookieService) { }
  setCookie(){
    
  }
  ngOnInit() {
  }
  onClickSubmit(formData){
    alert('Your username is: ' + formData.username + "password:" + formData.password);  
    let req = new XMLHttpRequest();
    let cookieValue: string = "test"
    req.onreadystatechange = function(){  
    if(req.readyState!== 4) return;
    if(req.status >= 200 && req.status < 300){
      cookieValue = req.responseText;
      console.log("RESPONSE IS: " + cookieValue)
    }
    if(req.status == 403){
      console.log("ACCESS DENIED")
    }
    }
    req.open("POST", "http://localhost:8080/user/login/")  // optional 3rd arg
      console.log(JSON.stringify(formData));
      req.setRequestHeader("Content-Type", "application/json");
      req.send(JSON.stringify(formData));
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
