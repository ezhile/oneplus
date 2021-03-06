import { Component, AfterViewInit } from '@angular/core';
import { PreferenceProfessional } from '../../models/preference-professional.model';
import { UserInfoService } from '../../services/user-info.service';
import { Http, Headers, RequestOptions  } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';
import {NgForm} from '@angular/forms';
declare var $:any;

@Component({
  selector: 'app-preference-professional',
  templateUrl: 'preference-professional.component.html',
  styleUrls: ['preference-professional.component.css']
})
export class PreferenceProfessionalComponent implements AfterViewInit {
    public lat:any;
    public lng:any;
    public address:any;
    public getAdrress:string;  
    public addressPreferenceCustomer:any;  
    showForm:boolean = true;
    optionsGender = [ 
      {name:'Male', value:'MALE', checked:true},
      {name:'FeMale', value:'FEMALE', checked:false},
      {name:'Trans', value:'TRANS', checked:false},
      {name:'Others', value:'OTHERS', checked:false}
    ]
    constructor(private http: Http, private router: Router, private userInfoService: UserInfoService) {
        
    }
    ngAfterViewInit() {
      this.model.ageRange={
        "min": '21',
        "max": '100'
      } 
      this.model.feesRange={
        "min": '25',
        "max": '75'
      } 
	  this.addressPreferenceCustomer = '';
    } 


    model = new PreferenceProfessional('','','','');
    submitted = false;
    errorMessage = '';
    staticErrorMsg = 'Complete all the fields';
    onAddressPreferenceCustomerChange(e){
        
        this.getAdrress = e.formatted_address;
    }

    preferenceProfessionalSend(preferenceProfessionalForm:NgForm){
        
          this.submitted = true;
          this.errorMessage = '';
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
          this.preferenceEditSubmit(preferenceProfessionalForm); 
    }
    preferenceEditSubmit(preferenceProfessionalForm) {
    //let apiUrl = environment.api.preferenceEdit.url.replace("{uuid}","9ee70f30-01ad-48e0-991f-adc73d291547");
	const uuid = this.userInfoService.get('user-id');
    let apiUrl = environment.api.preferenceEdit.url.replace("{uuid}",uuid);
	   let body = {

             "location" : this.model.location,
             "genders" :this.model.gender,
            "ageRange":this.model.ageRange,
            "feeRange":this.model.feesRange
        }

    /*let body = {
   	"location" : {
		"address" : "Berlin, Deutschland",
		"longitude" : "13.447541999999999",
		"latitude" : "52.4799174"
	},
       "genders" : ["FEMALE", "MALE"],
       "ageRange" : {
            "min" : 25,
            "max" : 45
        },
       "feeRange" : {
           "min" : 50,
           "max" : 100
        } 
};*/
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
              console.log(response)	 ;
              this.closeModel(preferenceProfessionalForm); 
		  },
          error =>  {
		  //alert('error');
      //this.closeModel(preferenceProfessionalForm); 
      this.showError(error);
		  } 
		);
	}

  closeModel(preferenceProfessionalForm){
     $(".change-preference").modal("hide");
     this.submitted = false;
    this.resetModel();
    preferenceProfessionalForm.resetForm(); 
  }
   showError(error){
    this.errorMessage = error.code;
    this.submitted = false
    if(!error.code){
        this.errorMessage = this.staticErrorMsg;
    }
  }
	
	onAgeChange(e){
    this.model.ageRange.min=Math.round( e.from);
    this.model.ageRange.max=Math.round( e.to);
	}

    onFeesChange(e){
    this.model.feesRange.min=Math.round( e.from);
    this.model.feesRange.max=Math.round( e.to);
	}
    resetModel(){
//this.model = new PreferenceProfessional('','','','');
        this.model.ageRange.min=Math.round( 21);
    this.model.ageRange.max=Math.round( 100);
    this.errorMessage = '';
      //this.model.feesRange={
       // "min": '25',
       // "max": '75'
      //} 
    }

  
}
 
