import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions  } from '@angular/http';
import 'rxjs/add/operator/map';
import { emailSubscribe }    from './emailSubscribe';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css']
})
export class SubscribeComponent implements OnInit {

  constructor(private http: Http) { }

  ngOnInit() {
  }
  model = new emailSubscribe('');  
  submitted = false;
  errorMessage = "";
	
  onSubmit() {
    this.submitted = true;
	this.authenticate(this.model.email);
  }
  
  authenticate(userEmail) {
	  let body = { 
		  "email" : userEmail
		}
	  let headers = new Headers({ 'Content-Type': 'application/json' });
	  let options = new RequestOptions({ headers: headers });
	
	  this.http
		.post('http://46.38.242.27:8082/api/subscribe', body, options)
		.map(response => response.json())
		.subscribe(
		  response  => {console.log(response);this.submitted = false;},
          error =>  {this.errorMessage = <any>error;this.submitted = false;}
		);
	}

}
