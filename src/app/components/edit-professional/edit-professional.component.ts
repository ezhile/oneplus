import { Component, OnInit, Output, EventEmitter, HostListener } from '@angular/core';
import { EditProfessional } from '../../models/edit-professional.model';
import { UserInfoService } from '../../services/user-info.service';
import { Http, Headers, RequestOptions  } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';
import {NgForm} from '@angular/forms';
declare var $:any;

@Component({
  selector: 'app-edit-professional',
  templateUrl: 'edit-professional.component.html',
  styleUrls: ['edit-professional.component.css']
})
export class EditProfessionalComponent implements OnInit {
    public lat:any;
    public lng:any;
    public address:any;
    public getAdrress:string;  
    //Output() onEditProfessionalComplete: EventEmitter<string> = new EventEmitter<string>();
time = {hour: 13, minute: 30};
    @Output() onEditProfesionalComplete: EventEmitter<string> = new EventEmitter<string>();

    optionsGender = [ 
      {name:'Male', value:'MALE', checked:true},
      {name:'FeMale', value:'FEMALE', checked:false},
      {name:'Trans', value:'TRANS', checked:false},
      {name:'Others', value:'OTHER', checked:false},
      {name:'Not specified', value:'NOT_SPECIFIED', checked:false}
    ];
    optionsWorkingDays = [ 
      {name:'Mo', value:'mo', checked:true},
      {name:'Tu', value:'tu', checked:false},
      {name:'We', value:'we', checked:false},
      {name:'Th', value:'th', checked:false},
      {name:'Fr', value:'fr', checked:false},
      {name:'Sa', value:'sa', checked:false},
      {name:'Su', value:'su', checked:false}
    ];
    userCurrency = [ {id: '1', key:'USD'}, {id: '2', key: 'EUR'}, {id: '3', key: 'GBP'}];
    constructor(private http: Http, private router: Router, private userInfoService: UserInfoService) {
        
    }
    ngOnInit() {
        this.model.workingHours = [
            {from:"00:00", to:"00:00"}
        ];

        this.getServicesList();
    } 
    model = new EditProfessional('', false,'','','','','',[],''); 
    submitted = false;
    availableServices = [];

    removeDupeKeys(serviceList){ 
       let services = serviceList;
        for(var i in services){
            delete services[i].display;
            delete services[i].value;
        }
        return services;
    }
    
    getServicesList(){
        const token = this.userInfoService.get('access_token');
	    let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization','Bearer '+token);
	    let options = new RequestOptions({ headers: headers });
	
	    this.http[environment.api.servicesList.method]
            (environment.api.servicesList.url, options)
		    .map(response => response.json()) 
		    .subscribe(
		        response  => {
                    this.availableServices = response;            
		        },
                error =>  {
		        } 
		    );
    }

    addTimeSlot(){
        this.model.workingHours.push({"from":"00:00", "to":"00:00"});
		console.log(this.model.workingHours)
    }
    
    onAddressChange(e){
        
        this.getAdrress = e.formatted_address;
    }

    editProfessionalSend(editProfessionalForm:NgForm){ 
          this.submitted = true;
          this.model.location={
            "address" : this.getAdrress,
            "longitude" : this.lng,
            "latitude" : this.lat
          }
          this.model.workingDays=[];
          for(var x in this.optionsWorkingDays) {
              if(this.optionsWorkingDays[x].checked) {
                  this.model.workingDays.push(this.optionsWorkingDays[x].value);
              }
          }
          this.professionalEditSubmit(editProfessionalForm); 
    }
    professionalEditSubmit(editProfessionalForm) {
	    let body = {
           "nickname" : this.model.nickname,
           "gender" : this.model.gender,
           "about" : this.model.about,
           "location" : this.model.location,
           "showAge" : this.model.genderShow,
           "serviceList": this.removeDupeKeys(this.model.serviceList),
           "workDays": this.model.workingDays,
           "workingHours": this.model.workingHours,
           "hourlyRate": this.model.hourlyRate
        } 

      console.log(body);
	  const token = this.userInfoService.get('access_token');
	  let headers = new Headers({ 'Content-Type': 'application/json' });
      headers.append('Authorization','Bearer '+token);
	  let options = new RequestOptions({ headers: headers });
	  const uuid = this.userInfoService.get('user-id');
      let apiUrl = environment.api.profileEdit.url.replace("{uuid}",uuid);
	
	  this.http[environment.api.profileEdit.method]
        (apiUrl, JSON.stringify(body), options)
		.map(response => response.json())
        .catch((error:any) => Observable.throw(error.json() || 'Server error')) 
		.subscribe(
		  response  => {
              console.log(response);
              this.onEditProfesionalComplete.emit(response);
              this.closeModel(editProfessionalForm); 
		  },
          error =>  {
		    alert(error.code);
            this.closeModel(editProfessionalForm);
		  } 
		); 
	}
  closeModel(editProfessionalForm){
      this.submitted = false;
     $(".change-profile-boxs").modal("hide");
      editProfessionalForm.resetForm(); 
      this.clearForm();
  }
  clearForm(){
    this.model.workingHours = [
            {from:"00:00", to:"00:00"}
        ];
  }
}

