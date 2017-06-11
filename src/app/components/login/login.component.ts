import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions  } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';
import { LoginUser } from '../../models/login-user.model';
import { UserInfoService } from '../../services/user-info.service'; 
declare  var $:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    model = new LoginUser('', '');
    submitted = false;
	errorMessage = "";
    
    constructor(private http: Http, private router: Router, private userInfoService: UserInfoService) {
        
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
		.catch((error:any) => Observable.throw(error.json() || 'Server error'))
		.subscribe(
		  response  => {
			  this.errorMessage="";
			  this.submitted = false;
			  if(response["user-id"]){
				// session storage for user
				this.userInfoService.set(response);
               //this.userInfoService.userInfo = response;
				 
                  $(".login-modal-box").modal("hide");
									if(response["user-roles"]=="ROLE_PROFESSIONAL"){
										this.router.navigate(['/profile/editProfessional']);
									}else{
										this.router.navigate(['/profile/editCustomer']);
									}      
			  }  
			  if(response.code==="ERR_ACCESS_DENIED"){
				  this.errorMessage = response.errors[0];
			  }		  
		  },
          error =>  {
		  let errorData = error;
		  if(errorData){
		      if(errorData.code==="ERR_ACCESS_DENIED"){
				  this.errorMessage = errorData.errors[0];
			  }
			}else if(error.status==403){
				this.errorMessage = "Access denied";
			}
			  this.submitted = false;
		  } 
		);
	}
	
	onChangeInput(){
		this.errorMessage="";
	}
 
}
