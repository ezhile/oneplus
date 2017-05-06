import { Component, OnInit } from '@angular/core';
import { EditCustomer } from '../../models/edit-customer.model';
import { UserInfoService } from '../../services/user-info.service';
import { Http, Headers, RequestOptions  } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-edit-customer',
  templateUrl: 'edit-customer.component.html',
  styleUrls: ['edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {
    public lat:any;
    public lng:any;
    public address:any;
    public getAdrress:string;  
    constructor(private http: Http, private router: Router, private userInfoService: UserInfoService) {
        
    }
    ngOnInit() {

    } 
    model = new EditCustomer('', '','','');
    onAddressChange(e){
        
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
            "nickname" : this.model.nickname,
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

