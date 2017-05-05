import { Component, OnInit } from '@angular/core';
import { EditCustomer } from '../../models/edit-customer.model';
import { UserInfoService } from '../../services/user-info.service';
import { Http, Headers, RequestOptions  } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'edit-page', 
  templateUrl: 'edit.page.html',
  styleUrls: ['edit.page.css']
})
export class EditPage implements OnInit {
    
    public base64textString:String="";
    public lat:any;
    public lng:any;
    public address:any;
    public getAdrress:string;
    constructor(private http: Http, private router: Router, private userInfoService: UserInfoService) {
        
    }

    model = new EditCustomer('', '','','');
    ngOnInit() {

    }
    imageUpload(evt){
        var files = evt.target.files;
        var file = files[0];
    
        if (files && file) {
            var reader = new FileReader();

            reader.onload =this._handleReaderLoaded.bind(this);

            reader.readAsBinaryString(file);
        }
    }
    _handleReaderLoaded(readerEvt) {
        var binaryString = readerEvt.target.result;
        this.base64textString= btoa(binaryString); 
    }
    onAddressChange(e){
        console.log(this.address);
        console.log(e);
        this.getAdrress = e.formatted_address;
    }

    editCustomerSend(){
        
          this.model.location={
            "address" : this.getAdrress,
            "longitude" : this.lng,
            "latitude" : this.lat
          }
          this.customerEditSubmit();
    }
    customerEditSubmit() {
	  let body = {
            "nickname" : this.getAdrress,
            "gender" : this.model.genderType,
            "about" : this.model.about,
            "location" : this.model.location
        } 
        console.log(body);
	  let headers = new Headers({ 'Content-Type': 'application/json' });
	  let options = new RequestOptions({ headers: headers });
	
	  this.http[environment.api.profileEdit.method]
        (environment.api.profileEdit.url, JSON.stringify(body), options)
		.map(response => response.json())
		.subscribe(
		  response  => {
              console.log(response)	  
		  },
          error =>  {
		  alert('error');
		  } 
		);
	}
}
