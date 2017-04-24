import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions  } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';



@Component({
  selector: 'view-page',
  templateUrl: 'view.page.html',
  styleUrls: ['view.page.css']
})
export class ViewPage implements OnInit {
    
    constructor(private http: Http) {
        
    }
    ngOnInit() {
        this.loadViewPage();
    }	
	userViewObj={};
	userViewProfile={};
	userViewLocation={};
	userViewRate={};
	isCustomer=false;
	userServiceMessages={};
	userServiceMsgText='';
	loadViewPage(){
		 this.http[environment.api.profileView.method]
        (environment.api.profileView.url)
		.map(response => response.json())
		.subscribe(
		  response  => {
			    
				this.userViewObj=response;
				this.userViewProfile=response.profile;	
				this.userViewLocation=response.profile.location;
				this.userServiceMessages=response.profile.services;
				this.userViewRate=response.profile.rate;
				this.updateUserServiceMessage();
				
		  },
          error =>  {}
		);
	}
	updateUserServiceMessage(){
		const obj=this.userServiceMessages;
		this.userServiceMsgText='';
		//category name
		for(let i in obj){
		
				this.userServiceMsgText=this.userServiceMsgText + obj[i].category+' '+obj[i].name+' ';
			
		}
		console.log(this.userServiceMsgText);
	}
}
