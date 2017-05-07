import { Component, OnInit } from '@angular/core';
import { EditProfessional } from '../../models/edit-professional.model';
import { UserInfoService } from '../../services/user-info.service';
import { Http, Headers, RequestOptions  } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-edit-professional',
  templateUrl: 'edit-professional.component.html',
  styleUrls: ['edit-professional.component.css']
})
export class EditProfessionalComponent implements OnInit {
    public lat:any;
    public lng:any;
    public address2:any;
    public getAdrress:string;   
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
    
    onAddressChange2(e){
        
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
          this.professionalEditSubmit(); 
    }
    professionalEditSubmit() {
	  let body = {
            "nickname" : this.model.nickname,
            "gender" : this.model.gender,
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

