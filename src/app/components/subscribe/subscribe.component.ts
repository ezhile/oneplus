import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions  } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';
import { emailSubscribe }    from '../../models/email-subscribe.model';

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
  isServiceHitted= false;
	
  onSubmit() {
    this.submitted = true;
	this.subscribeEmail(this.model.email);
  }
  
  subscribeEmail(userEmail) {
	  let body = { "email" : userEmail };
	  let headers = new Headers({ 'Content-Type': 'application/json' });
	  let options = new RequestOptions({ headers: headers });
	   this.http[environment.api.subscribe.method]
		(environment.api.subscribe.url, JSON.stringify(body), options)
		.map(response => response)
		.subscribe(
		  response  => {
				  this.isServiceHitted=true;
				  this.submitted = false;
				  if(response.status===201){
					  this.errorMessage="";
				  }
		   },
		  error =>  {
		  let errorData = JSON.parse(error._body);
		  if(errorData){
			if(errorData.status==="BAD_REQUEST"){
				  if(errorData.code==="ERR_SUBSCRIPTION_ALREADY_EXISTS"){
					  this.errorMessage = errorData.errors[0];
				  }	
			  }
			}else if(error.status===400){
				this.errorMessage = "This email already exists";
			}
			this.submitted = false;
		  }
		);
	}
	onChangeEmailSubcrbibeInp(){
		this.errorMessage="";
		this.isServiceHitted=false;
	}

}
