import { Component, OnInit, Output, EventEmitter, HostListener } from '@angular/core';
import { EditCustomer } from '../../models/edit-customer.model';
import { UserInfoService } from '../../services/user-info.service';
import { Http, Headers, RequestOptions  } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';
declare var $:any;

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

     @Output() onEditCustomerComplete: EventEmitter<string> = new EventEmitter<string>();
    constructor(private http: Http, private router: Router, private userInfoService: UserInfoService) {
        
    }
    ngOnInit() {

    } 
    model = new EditCustomer('', '','','');
    submitted = false;
    onAddressChange(e){
        
        this.getAdrress = e.formatted_address;
    }

    editCustomerSend(){	
          this.submitted = true;	
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
		const uuid = this.userInfoService.get('user-id');
	  const token = this.userInfoService.get('access_token');
	  let headers = new Headers({ 'Content-Type': 'application/json' });
      headers.append('Authorization','Bearer '+token);
	  let options = new RequestOptions({ headers: headers });
    let apiUrl = environment.api.profileEdit.url.replace("{uuid}",uuid);

	  this.http[environment.api.profileEdit.method]
        (apiUrl, JSON.stringify(body), options)
		.map(response => response.json())
		.subscribe(
		  response  => {
              console.log(response);
              this.onEditCustomerComplete.emit(response);
              this.closeModel();	  
		  },
          error =>  {
		  alert('error');
      this.closeModel();
		  } 
		);
	}
  closeModel(){
     $(".change-profile-boxs").modal("hide");
     this.submitted = false;
  }
}

