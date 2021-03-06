import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions  } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';
import { UserInfoService } from '../../services/user-info.service';
declare  var $:any;



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
	userViewRate={
      amount:""
    };
	isCustomer=true;
	userServiceMessages={};
	userWorkingHours='';
	userServiceMsgText=''; 
	workingHours=[];
	
	loadViewPage(){	
		this.checkIsCustomer();	
		//let apiUrl = environment.api.profileView.url.replace("{uuid}","9ee70f30-01ad-48e0-991f-adc73d291547");
		const uuid = this.userInfoService.get('user-id');
		let apiUrl = environment.api.profileView.url.replace("{uuid}", uuid);
		const token = this.userInfoService.get('access_token');
	  let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization','Bearer '+token);
	  let options = new RequestOptions({ headers: headers });
		 this.http[environment.api.profileView.method]
        (apiUrl, options)
		.map(response => response.json())
		.subscribe(
		  response  => {
			    
				//this.userViewObj=JSON.parse(response);
				this.userViewObj=response;
				this.userViewProfile=response.profile;	
				this.userViewLocation=response.preferences.location;
				this.userServiceMessages=response.profile.services;
				this.userViewRate=response.profile.hourlyRate;
				this.workingHours = response.profile.workingHours;
				let hotoThumnail = response.profile.picture.base64encodedThumbnail;
       			 $("#profilePic").css("background","url('data:image/jpeg;base64,"+hotoThumnail+"')");
				this.updateUserServiceMessage();
				
		  },
          error =>  {}
		);
	}
	updateUserServiceMessage(){
		const obj=this.userServiceMessages;
		this.userServiceMsgText='';
		for(let i in obj){
		
				this.userServiceMsgText=this.userServiceMsgText + obj[i].key+' '+obj[i].category+' ';
			
		}
		let UserWorkingHourArr=[]
		for(let j in this.workingHours){
			var timesrt=' ';
			timesrt=timesrt+this.workingHours[j]['from']+'-'+this.workingHours[j]['to'];
			UserWorkingHourArr.push(timesrt);
		}
		this.userWorkingHours=UserWorkingHourArr.join();
	}
	checkIsCustomer(){
		//this.userInfoService.get('access_token')
		console.log(this.userInfoService.get('user-roles')[0]);
		if(this.userInfoService.get('user-roles')[0] === "ROLE_PROFESSIONAL"){
			this.isCustomer=false;
		}else{
			this.isCustomer=true;
		}
	}
}
