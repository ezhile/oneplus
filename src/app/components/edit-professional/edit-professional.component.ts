import { Component, OnInit, Output, EventEmitter, HostListener } from '@angular/core';
import { EditProfessional } from '../../models/edit-professional.model';
import { UserInfoService } from '../../services/user-info.service';
import { Http, Headers, RequestOptions  } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';
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

    @Output() onEditProfesionalComplete: EventEmitter<string> = new EventEmitter<string>();

    timeSlots = [
        {from:"00:00", to:"00:00"}
    ];

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
        this.getServicesList();
    }
    ngOnInit() {

    } 
    model = new EditProfessional('', false,'','','','','','','');
    availableServices = [];
    submitted = false;
    
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
        this.timeSlots.push({"from":"00:00", "to":"00:00"}); 
    }
    
    onAddressChange(e){
        
        this.getAdrress = e.formatted_address;
    }

    editProfessionalSend(){
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
          this.model.serviceList = [{
                    "category" : "SERVICE",
                    "key": "SERVICE1"
            },
            {
                    "category" : "GARDEROBE",
                    "key": "SERVICE6"
            }];
            this.model.workingHours= [ {
            "from" : "09:00",
            "to" : "12:00"
         }, {
           "from" : "13:00",
           "to" : "18:00"
        } , {
           "from" : "19:00",
           "to" : "21:00"
        } ]
          this.professionalEditSubmit(); 
    }
    professionalEditSubmit() {
	    let body = {
           "nickname" : this.model.nickname,
           "gender" : this.model.gender,
           "about" : this.model.about,
           "location" : this.model.location,
           "showAge" : this.model.genderShow,
           "serviceList": this.model.serviceList,
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
		.subscribe(
		  response  => {
              console.log(response);
              this.onEditProfesionalComplete.emit(response);
              this.closeModel(); 
		  },
          error =>  {
		    alert('error');
            this.closeModel();
		  } 
		);
	}
  closeModel(){
      this.submitted = false;
     $(".change-profile-boxs").modal("hide");
  }
}

