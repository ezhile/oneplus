import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions  } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
import { User } from './user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    model = new User('', '');
    submitted = false;
	errorMessage = "";
    
    constructor(private http: Http) {
        
    }
    ngOnInit() {
        
    }	
    onSubmit() {
        this.submitted = true;
		this.authenticate(this.model.username, this.model.password);		
    }
	
	authenticate(username, password) {
	  let body = { "username" : username, "password" : password}; 
	  let headers = new Headers({ 'Content-Type': 'application/json' });
	  let options = new RequestOptions({ headers: headers });
	
	  this.http[environment.api.login.method]
        (environment.api.login.url, JSON.stringify(body), options)
		.map(response => response.json())
		.subscribe(
		  response  => {console.log(response);this.submitted = false;},
          error =>  {this.errorMessage = <any>error;this.submitted = false;}
		);
	}
 
}
