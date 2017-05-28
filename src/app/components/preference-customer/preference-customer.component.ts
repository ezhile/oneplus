import { Component, AfterViewInit } from '@angular/core';
import { PreferenceCustomer } from '../../models/preference-customer.model';
import { UserInfoService } from '../../services/user-info.service';
import { Http, Headers, RequestOptions  } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';
declare var $:any;

@Component({
  selector: 'app-preference-customer',
  templateUrl: 'preference-customer.component.html',
  styleUrls: ['preference-customer.component.css']
})
export class PreferenceCustomerComponent implements AfterViewInit {
    public lat:any;
    public lng:any;
    public addressPreferenceCustomer:any;
    public getAdrress:string;  
    optionsGender = [ 
      {name:'Male', value:'MALE', checked:true},
      {name:'FeMale', value:'FEMALE', checked:false},
      {name:'Trans', value:'TRANS', checked:false},
      {name:'Others', value:'OTHER', checked:false},
      {name:'Not specified', value:'NOT_SPECIFIED', checked:false}
    ]

    constructor(private http: Http, private router: Router, private userInfoService: UserInfoService) {
        
    }
    ngAfterViewInit() {
        this.model.ageRange={
			    "min": '21',
			    "max": '100'
		    } 
    } 


    model = new PreferenceCustomer('', '','','');
    submitted = false;
    onAddressPreferenceCustomerChange(e){
        
        this.getAdrress = e.formatted_address;
    }

    preferenceCustomerSend(){
          this.submitted = true;
          this.model.location={
            "address" : this.getAdrress,
            "longitude" : this.lng,
            "latitude" : this.lat
          }
          this.model.gender=[];
          for(var x in this.optionsGender) {
              if(this.optionsGender[x].checked) {
                  this.model.gender.push(this.optionsGender[x].value);
              }
          }

          this.customerPreferenceubmit(); 
    }
    customerPreferenceubmit() {
		  const uuid = this.userInfoService.get('user-id');
      let apiUrl = environment.api.preferenceEdit.url.replace("{uuid}",uuid);
	    let body = {
        "location" : this.model.location,
        "genders" :this.model.gender,
        "ageRange":this.model.ageRange
      }
      console.log(body);
	    const token = this.userInfoService.get('access_token');
	    let headers = new Headers({ 'Content-Type': 'application/json' });
      headers.append('Authorization','Bearer '+token);
	    let options = new RequestOptions({ headers: headers });
	
	    this.http[environment.api.preferenceEdit.method]
        (apiUrl, JSON.stringify(body), options)
		    .map(response => response.json())
		    .subscribe(
		      response  => {
              console.log(response);
              this.closeModel();	  
		      },
          error =>  {
		          alert('error');
              this.closeModel();
		      } 
		    );
	}
  closeModel(){
     $(".change-preference").modal("hide");
     this.submitted = false;
  }
  onAgeChange(e){
    this.model.ageRange.min=Math.round( e.from);
    this.model.ageRange.max=Math.round( e.to);
	}
    
}

