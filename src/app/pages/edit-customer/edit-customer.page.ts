import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions  } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';
import { UserInfoService } from '../../services/user-info.service';
declare var $:any;

@Component({
  selector: 'edit-customer-page', 
  templateUrl: 'edit-customer.page.html',
  styleUrls: ['edit-customer.page.css']
})
export class EditCustomerPage implements OnInit {
    
    public base64textString:string="";
    public photoThumnail:string="";
    private isPhotoUploaded:boolean = false;
    public showUploadLink:boolean = false; 
  	public spinLoader:boolean = false;
    public hidedefault:boolean = false;
	
    constructor(private http: Http, private userInfoService: UserInfoService) {
        this.showUploadLink = false;
    }

    userViewObj={
      rating: "",
      favoritesCount:""
    };
    userViewProfile={
      nickname:"",
      about:"",
      gender:"",
      age:""
    };
    userViewLocation={
      address:""
    };
    userViewRate={};
    isCustomer=true;
    userServiceMessages={};
    userWorkingHours='';
    userServiceMsgText=''; 
    workingHours=[];

    ngOnInit() {
      this.loadViewPage();
    }

    imageUpload(event) {
      this.isPhotoUploaded = true;
      this.base64textString = event;
	  let body = { "base64Content" : this.base64textString}; 
	  let headers = new Headers({ 'Content-Type': 'application/json' });
	  let options = new RequestOptions({ headers: headers });
	  const uuid = this.userInfoService.get('user-id');
      let apiUrl = environment.api.photoUpload.url.replace("{uuid}", uuid);
      this.spinLoader = true;
	
	  this.http[environment.api.photoUpload.method]
        (apiUrl, JSON.stringify(body), options)
		.map(response => response.json())
		.subscribe(
		  response  => {
				this.spinLoader = false;
				this.hidedefault = true;
              this.photoThumnail = response.base64encodedThumbnail;
              //console.log(this.photoThumnail);
              $("#profilePic").css("background","url('data:image/jpeg;base64,"+this.photoThumnail+"')");
		  },
          error =>  {
		  
		  } 
		);
	}
  onPhotoHover(){
    if(this.isPhotoUploaded){
      this.showUploadLink = true; 
    }
  }
  onPhotoLeave(){
    if(this.isPhotoUploaded){
      this.showUploadLink = false;
    }
  }  

  loadViewPage(){	
		//this.checkIsCustomer();	
		//let apiUrl = environment.api.profileView.url.replace("{uuid}","9ee70f30-01ad-48e0-991f-adc73d291547");
		const uuid = this.userInfoService.get('user-id');
		let apiUrl = environment.api.profileView.url.replace("{uuid}", uuid);
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

  editCustomerCallDone(event){
    console.log('event called');
    let response=JSON.parse(event._body);
    this.userViewObj=response;
    this.userViewProfile=response.profile;	
    this.userViewLocation=response.profile.location;
    this.userServiceMessages=response.profile.services;
    this.userViewRate=response.profile.rate;
    this.workingHours = response.profile.workingHours
    this.updateUserServiceMessage(); 
  }


}
