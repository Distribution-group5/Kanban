import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //Set up our status which will change depending on response from server.
  status: string = '';
  //Get our cookie object with easy methods.
  constructor(private cookie:CookieService) { }
  ngOnInit() {
  }
  async onClickSubmit(formData){
    try{
      //We make our formData object into a json string
      formData = JSON.stringify(formData)
      //We call out method which will send the request with an url and our json string
      //data is the response from the server
      const data = await postData('http://localhost:8080/user/login/',formData);
      //If data is not undefined, which means the user + password combo did exist
        console.log(data);
        if (data != undefined) {
      //Set cookie with the username returned from the node server.
      this.cookie.set('data',data.username)
      //We display some HTML to show the user it worked
      this.status = `ACCESS GRANTED USER: ${data.username} `
      }
      else{
        // If user + password didn't exist
       this.status = 'WRONG USERNAME OR PASSWORD'
      }
    }
    catch(error){
      console.error(error)
    }
    //Our method which takes a url, and some data, both as strings.
    async function postData(url = '', data = ''){
      console.log("Data to be send is" + data + url)
      //Response is what the fetch gets. Await means it will only return once there's a response.
      const response = await fetch(url,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: data
      });
      try{
        //We turn the response into an json object
      return await response.json();
      }
      catch(error){
        //We return undefined if the server didn't find a match with user+pass
        return undefined
      }
    }
  }
}
export class TestClass{
  onClickSubmit(formData){
  alert('Your username is: ' + formData.username);
  }
}
