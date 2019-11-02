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
  async onClickSubmit(formData){
    alert('Your username is: ' + formData.username + "password:" + formData.password);  

    try{
      formData = JSON.stringify(formData)
      const data = await postData('http://localhost:8080/user/login/',formData);
      this.cookie.set('data',data.username)
      console.log(data)
      console.log(JSON.stringify(data))
    }
    catch(error){
      console.error(error)
    }
  
    async function postData(url = '', data = ''){
      console.log("Data to be send is" + data + url)
      const response = await fetch(url,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: data
      });
      
      return await response.json();
    }
  }
}
export class TestClass{
  onClickSubmit(formData){
  alert('Your username is: ' + formData.username);
  }
}
