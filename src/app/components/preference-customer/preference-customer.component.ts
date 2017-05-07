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
      {name:'Male', value:'1', checked:true},
      {name:'FeMale', value:'2', checked:false},
      {name:'Trans', value:'3', checked:false},
      {name:'Others', value:'4', checked:false},
      {name:'Not specifiled', value:'5', checked:false}
    ]

    constructor(private http: Http, private router: Router, private userInfoService: UserInfoService) {
        
    }
    ngAfterViewInit() {
    } 


    model = new PreferenceCustomer('', '','');
    onAddressPreferenceCustomerChange(e){
        
        this.getAdrress = e.formatted_address;
    }

    preferenceCustomerSend(){
        
          this.model.location={
            "address" : this.getAdrress,
            "longitude" : this.lng,
            "latitude" : this.lat
          }
          this.model.gender=[];
          for(var x in this.optionsGender) {
              if(this.optionsGender[x].checked) {
                  this.model.gender.push(this.optionsGender[x].name);
              }
          }
          this.model.ageRange= {
            "min": "0",
            "max": "0"
          };
          console.log('genderss');
          console.log(this.model.gender);
          console.log(this.getAdrress);
          this.customerPreferenceubmit(); 
    }
    customerPreferenceubmit() {
    let apiUrl = environment.api.preferenceEdit.url.replace("{uuid}","9ee70f30-01ad-48e0-991f-adc73d291547");
    //let apiUrl = environment.api.preferenceEdit.url.replace("{uuid}",UserInfoService.user-id);
	  let body = {

            "location" : this.model.location,
            "gender" :this.model.gender,
            ageRange:this.model.ageRange
        } 
        console.log(body);
	  let headers = new Headers({ 'Content-Type': 'application/json' });
	  let options = new RequestOptions({ headers: headers });
	
	  this.http[environment.api.preferenceEdit.method]
        (apiUrl, JSON.stringify(body), options)
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

