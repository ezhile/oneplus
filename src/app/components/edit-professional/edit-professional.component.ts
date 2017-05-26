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

    @Output() onEditProfeesionalComplete: EventEmitter<string> = new EventEmitter<string>();

    timeSlots = [
        {from:"00:00", to:"00:00"}
    ];

    optionsGender = [ 
      {name:'Male', value:'1', checked:true},
      {name:'FeMale', value:'2', checked:false},
      {name:'Trans', value:'3', checked:false},
      {name:'Others', value:'4', checked:false},
      {name:'Not specifiled', value:'5', checked:false}
    ];
    optionsWorkingDays = [ 
      {name:'Mo', value:'1', checked:true},
      {name:'Tu', value:'2', checked:false},
      {name:'We', value:'3', checked:false},
      {name:'Th', value:'4', checked:false},
      {name:'Fr', value:'5', checked:false},
      {name:'Sa', value:'6', checked:false},
      {name:'Su', value:'7', checked:false}
    ];
    constructor(private http: Http, private router: Router, private userInfoService: UserInfoService) {
        
    }
    ngOnInit() {

    } 
    model = new EditProfessional('', false,'','','','','','');

    addTimeSlot(){
        //alert("asasas")
        this.timeSlots.push({"from":"00:00", "to":"00:00"});
    }
    
    onAddressChange(e){
        
        this.getAdrress = e.formatted_address;
    }

    editProfessionalSend(){
        
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
          this.model.workingDays=[];
          for(var x in this.optionsWorkingDays) {
              if(this.optionsWorkingDays[x].checked) {
                  this.model.workingDays.push(this.optionsWorkingDays[x].name);
              }
          }
          this.professionalEditSubmit(); 
    }
    professionalEditSubmit() {
	//   let body = {
    //         "nickname" : this.model.nickname,
    //         "gender" : this.model.gender,
    //         "about" : this.model.about,
    //         "location" : this.model.location,
    //         "genderShow": this.model.genderShow,
    //         "serviceList": this.model.serviceList,
    //         "workingDays": this.model.workingDays,
    //         "workingHours": this.model.workingHours
    //     } 

       let body = {
	"nickname" : "nebur",
	"gender" : "MALE",
	"about" : "die Nr. 1 in deutschlands",
	"location" : {
		"address" : "Berlin, Deutschland",
		"longitude" : "13.447541999999999",
		"latitude" : "52.4799174"
	},
        "showAge" : false,
        "workDays" : ["mo","tu","we"],
        "workingHours" : [ {
            "from" : "09:00",
            "to" : "12:00"
         }, {
           "from" : "13:00",
           "to" : "18:00"
        } , {
           "from" : "19:00",
           "to" : "21:00"
        } ],
       "services" : [{
            "category" : "SERVICE",
            "key": "SERVICE1"
       },
       {
            "category" : "GARDEROBE",
            "key": "SERVICE6"
       }],
      "hourlyRate" : {
           "amount" : 15.0,
            "currency" : "EUR"
        }
};
        console.log(body);
	  const token = this.userInfoService.get('access_token');
	  let headers = new Headers({ 'Content-Type': 'application/json' });
      headers.append('Authorization','Bearer '+token);
	  let options = new RequestOptions({ headers: headers });
    //let apiUrl = environment.api.profileEdit.url.replace("{uuid}","9ee70f30-01ad-48e0-991f-adc73d291547");
	const uuid = this.userInfoService.get('user-id');
    let apiUrl = environment.api.profileEdit.url.replace("{uuid}",uuid);
	
	  this.http[environment.api.profileEdit.method]
        (apiUrl, JSON.stringify(body), options)
		.map(response => response)
		.subscribe(
		  response  => {
              console.log(response);
              this.onEditProfeesionalComplete.emit(response);

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
  }
}

