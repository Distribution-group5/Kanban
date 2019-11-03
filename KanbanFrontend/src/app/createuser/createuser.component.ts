import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.css']
})
export class CreateuserComponent implements OnInit {
  status: string = '';
  constructor() { }

  ngOnInit() {
  }

  async onClickSubmit(formData){
    try{
      console.log(formData.username + " : " + formData.password)
      if(formData.password != formData.passwordConfirm){
        this.status ='BOTH PASSWORDS MUST MATCH'
        return;
      }
      
      let formDataJSON = {Username: formData.username, Password: formData.password}
      console.log(formData)
      //We call out method which will send the request with an url and our json object
      //data is the response from the server
      const data = await postData('http://localhost:8080/user/CreateUser/',formDataJSON);
      //If data is not undefined, which means the user + password combo did exist
      if(data != undefined){
      //We display some HTML to show the user it worked
      this.status = `USER CREATED YAY: ${data.username} `
      }
      else{
        // If user + password didn't exist
       this.status = 'USER ALREADY EXISTS, TRY ANOTHER NAME'
      }
    }
    catch(error){
      console.error(error)
    }
    //Our method which takes a url, and some data, both as strings.
    async function postData(url = '', data = {}){
      console.log("Data to be send is" + JSON.stringify(data) + url)
      //Response is what the fetch gets. Await means it will only return once there's a response.
      const response = await fetch(url,{
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      try{
        
      return await response.json();
      }
      catch(error){
        //We return undefined if the already had a user with that name
        return undefined
      }
    }
  }

}
