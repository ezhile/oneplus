import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions  } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';
import { UserInfoService } from '../../services/user-info.service';



@Component({
  selector: 'view-page',
  templateUrl: 'view.page.html',
  styleUrls: ['view.page.css']
})
export class ViewPage implements OnInit {
    
    constructor(private http: Http, private userInfoService: UserInfoService) {
        
    }
    ngOnInit() {
        this.loadViewPage();
    }	
	userViewObj={
		rating: "",
		favoritesCount:""
	};
	userViewProfile={
		nickname:"",
		about:"",
		gender:""
	};
	userViewLocation={
		address:""
	};
	userViewRate={};
	isCustomer=false;
	userServiceMessages={};
	userWorkingHours='';
	userServiceMsgText=''; 
	workingHours=[];
	
	loadViewPage(){		
		let apiUrl = environment.api.profileView.url.replace("{uuid}","9ee70f30-01ad-48e0-991f-adc73d291547");
		 this.http[environment.api.profileView.method]
        (apiUrl)
		.map(response => response.json())
		.subscribe(
		  response  => {
			    
				//this.userViewObj=JSON.parse(response);
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
