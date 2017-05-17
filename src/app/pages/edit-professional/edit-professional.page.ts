import { Component, OnInit } from '@angular/core';
import { EditCustomer } from '../../models/edit-customer.model';
import { UserInfoService } from '../../services/user-info.service';
import { Http, Headers, RequestOptions  } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';
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

    model = new EditCustomer('', '','','');
    ngOnInit() {

    }
    triggerImageUpload(e){
         e.preventDefault();
         $("#profilePic:hidden").trigger('click');
    }
    imageUpload(event) {
      this.isPhotoUploaded = true;
      this.base64textString = event;
	  let body = { "base64Content" : this.base64textString}; 
	  let headers = new Headers({ 'Content-Type': 'application/json' });
	  let options = new RequestOptions({ headers: headers });
	  const uuid = this.userInfoService.userInfo['user-id'];
      let apiUrl = environment.api.photoUpload.url.replace("{uuid}", uuid);
      
	
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
    _handleReaderLoaded(readerEvt) {

        var binaryString = readerEvt.target.result;
        this.base64textString= btoa(binaryString);
    }  
}
