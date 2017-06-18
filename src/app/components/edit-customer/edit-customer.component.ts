import { Component, OnInit, Output, EventEmitter, HostListener } from '@angular/core';
import { EditCustomer } from '../../models/edit-customer.model';
import { UserInfoService } from '../../services/user-info.service';
import { Http, Headers, RequestOptions  } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';
import {NgForm} from '@angular/forms';
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
    errorMessage = '';
    staticErrorMsg = 'Complete all the fields';
    onAddressChange(e){
        
        this.getAdrress = e.formatted_address;
    }

    editCustomerSend(editCustomerForm:NgForm){	
          this.submitted = true;	
          this.errorMessage = '';
          this.model.location={
            "address" : this.getAdrress,
            "longitude" : this.lng,
            "latitude" : this.lat
          }
          this.customerEditSubmit(editCustomerForm); 
    }
    customerEditSubmit(editCustomerForm) {
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
              this.closeModel(editCustomerForm);	  
		  },
          error =>  {
		  //alert('error');
      //this.closeModel(editCustomerForm);
      this.showError(error);
		  } 
		);
	}
  closeModel(editCustomerForm){
     $(".change-profile-boxs").modal("hide");
     this.submitted = false;
     editCustomerForm.resetForm();
     this.errorMessage = '';
  }
  showError(error){
    this.errorMessage = error.code;
    this.submitted = false
    if(!error.code){
        this.errorMessage = this.staticErrorMsg;
    }
  }
}

