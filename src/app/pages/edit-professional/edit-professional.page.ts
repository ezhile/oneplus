import { Component, OnInit } from '@angular/core';
import { UserInfoService } from '../../services/user-info.service';
import { Http, Headers, RequestOptions  } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';
import { Ng2FileDropAcceptedFile, Ng2FileDropRejectedFile }  from 'ng2-file-drop';
declare  var $:any;

@Component({
  selector: 'edit-professional-page', 
  templateUrl: 'edit-professional.page.html',
  styleUrls: ['edit-professional.page.css'] 
})
export class EditProfessionalPage implements OnInit {
    
    public base64textString:string="";
    public photoThumnail:string="";
    private isPhotoUploaded:boolean = false;
    public showUploadLink:boolean = false; 
  	public spinLoader:boolean = false;
    public hidedefault:boolean = false;

    constructor(private http: Http, private router: Router, private userInfoService: UserInfoService) {
        
    }

    userViewObj={
      rating: "0",
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
    userViewRate={
      amount:""
    };
    isCustomer=true;
    userServiceMessages=[];
    userWorkingHours='';
    userServiceMsgText=''; 
    workingHours=[];
    ngOnInit() {
        this.loadViewPage();
    }
    triggerImageUpload(e){
         e.preventDefault();
         $("#profilePic:hidden").trigger('click');
    }
    imageUpload(event) {
      this.isPhotoUploaded = true;
      this.base64textString = event;
	  let body = { "base64Content" : this.base64textString}; 
	  const token = this.userInfoService.get('access_token');
	  let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization','Bearer '+token);
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
    _handleReaderLoaded(readerEvt) {

        var binaryString = readerEvt.target.result;
        this.base64textString= btoa(binaryString);
    }  
    loadViewPage(){	
		//this.checkIsCustomer();	
		//let apiUrl = environment.api.profileView.url.replace("{uuid}","9ee70f30-01ad-48e0-991f-adc73d291547");
    if(!this.userInfoService.get('user-id')){
      this.router.navigate(['/home']);
    }
		const uuid = this.userInfoService.get('user-id');
    const token = this.userInfoService.get('access_token');
	  let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization','Bearer '+token);
	  let options = new RequestOptions({ headers: headers });
		let apiUrl = environment.api.profileView.url.replace("{uuid}", uuid);
		 this.http[environment.api.profileView.method]
        (apiUrl, options)
		.map(response => response.json())
		.subscribe(
		  response  => {
			    
				//this.userViewObj=JSON.parse(response);
				this.userViewObj=response;
				if(response.profile){
          this.userViewProfile=response.profile;
          if(response.profile.location){
            this.userViewLocation=response.profile.location;
          }
          if(response.profile.services){
            this.userServiceMessages=response.profile.services;
          }
          if(response.profile.rate){
            this.userViewRate=response.profile.rate;
          }
          if(response.profile.workingHours){
            this.workingHours = response.profile.workingHours;
          }
        };	
        
				this.updateUserServiceMessage();
				
		  },
          error =>  {}
		);
	}
	
	
	getItemObjects = [{category: 'Angular', key: 'any'},{category: 'React', key: 'any1'}, {category: 'Node', key: 'any2'}];	
	setItemObjects = [];   
	onItemAdded(item) {		
		this.setItemObjects.push(item);	
		console.log(this.setItemObjects);		
	}
  updateUserServiceMessage(){
		const obj=this.userServiceMessages;
		this.userServiceMsgText='';
		for(let i in obj){
		
				this.userServiceMsgText=this.userServiceMsgText + obj[i].category+' '+obj[i].key+' ';
			
		}
		let UserWorkingHourArr=[]
		for(let j in this.workingHours){
			var timesrt=' ';
			timesrt=timesrt+this.workingHours[j]['from']+'-'+this.workingHours[j]['to'];
			UserWorkingHourArr.push(timesrt);
		}
		this.userWorkingHours=UserWorkingHourArr.join();
	}

  editProfesionalCallDone(event){
    console.log('event called');
    let response=event;
    this.userViewProfile.about = response.about;
    this.userViewProfile.age = response.age;
    this.userViewProfile.gender = response.gender;
    this.userViewProfile.nickname = response.nickname;
    this.userViewLocation.address = response.location.address;
    this.workingHours = response.workingHours;
    this.userViewRate.amount = response.hourlyRate.amount;
    this.userServiceMessages = response.services;
    this.spinLoader = false;
		this.hidedefault = true;
    this.photoThumnail = response.picture.base64encodedThumbnail;
    $("#profilePic").css("background","url('data:image/jpeg;base64,"+this.photoThumnail+"')");
    this.updateUserServiceMessage(); 
  }

  // File being dragged has moved into the drop region
  private dragFileOverStart() {
  }
 
  // File being dragged has moved out of the drop region
  private dragFileOverEnd() {
  }
 
  // File being dragged has been dropped and is valid
  private dragFileAccepted(acceptedFile: Ng2FileDropAcceptedFile) {
  }
 
  // // File being dragged has been dropped and has been rejected
  // private dragFileRejected(rejectedFile: Ng2FileDropRejectedFile) {
  // }
 
  // // Files being dragged have been dropped.
  // private dragFilesDropped(droppedFile: Ng2FileDropFilesDropped) {
  // }
}
