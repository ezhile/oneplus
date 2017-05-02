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
	userWorkingHours='';
	userServiceMsgText='';
	workingHours=[];
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
				this.workingHours = response.profile.workingHours
				this.updateUserServiceMessage();
				
		  },
          error =>  {}
		);
	}
	updateUserServiceMessage(){
		const obj=this.userServiceMessages;
		this.userServiceMsgText='';
		for(let i in obj){
		
				this.userServiceMsgText=this.userServiceMsgText + obj[i].category+' '+obj[i].name+' ';
			
		}
		let UserWorkingHourArr=[]
		for(let j in this.workingHours){
			var timesrt=' ';
			timesrt=timesrt+this.workingHours[j]['from']+'-'+this.workingHours[j]['to'];
			UserWorkingHourArr.push(timesrt);
		}
		this.userWorkingHours=UserWorkingHourArr.join();
	}
}
