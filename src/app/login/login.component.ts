import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions  } from '@angular/http';
import 'rxjs/add/operator/map';
import { User }    from './user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor(private http: Http) {}

    ngOnInit() {

    }

    model = new User('', '');
    submitted = false;
	errorMessage = "";
    onSubmit() {
        this.submitted = true;
		this.authenticate(this.model.username, this.model.password);
    }
	
	authenticate(username, password) {
	  /* let body = `username=${username}&password=${password}`; */
	  let body = { "username" : "test123@example.com", "password" : "123456789"}; 
	  let headers = new Headers({ 'Content-Type': 'application/json' });
	  let options = new RequestOptions({ headers: headers });
	
	  this.http
		.post('http://46.38.242.27:8082/api/login', body, options)
		.map(response => response.json())
		.subscribe(
		  response  => console.log(response),
          error =>  this.errorMessage = <any>error
		);
	}
 
}
