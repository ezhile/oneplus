import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions  } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';
import { UserInfoService } from '../../services/user-info.service';

@Component({
  selector: 'edit-page', 
  templateUrl: 'edit.page.html',
  styleUrls: ['edit.page.css']
})
export class EditPage implements OnInit {
    
    public base64textString:String="";

    constructor(private http: Http, private userInfoService: UserInfoService) {
        
    }

    ngOnInit() {

    }

    imageUpload(event) {
      this.base64textString = event;
	  let body = { "base64Content" : this.base64textString}; 
	  let headers = new Headers({ 'Content-Type': 'application/json' });
	  let options = new RequestOptions({ headers: headers });
      let apiUrl = environment.api.photoUpload.url.replace("{uuid}","9ee70f30-01ad-48e0-991f-adc73d291547");
      console.log(this.userInfoService);
	
	  this.http[environment.api.photoUpload.method]
        (apiUrl, JSON.stringify(body), options)
		.map(response => response.json())
		.subscribe(
		  response  => {
			  console.log(response); 
		  },
          error =>  {
		  
		  } 
		);
	}  
}
