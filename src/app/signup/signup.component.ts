import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions  } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
import { RegisterUser } from './registerUser';
declare  var $:any;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

 model = new RegisterUser('','','','','','','PROFESSIONAL');
 submitted = false;
 errorMessage = "";
 onsucsessMsg="";
 constructor(private http: Http) { }
  //userMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November','December'];
  //should be i18n capable, i.e. with translation
  userMonths = [ {id: '1', key:'january'},
           {id: '2', key: 'february'},
           {id: '3', key: 'march'},
           {id: '4', key: 'april'},
           {id: '5', key: 'mai'},
           {id: '6', key: 'june'},
           {id: '7', key: 'july'},
           {id: '8', key: 'august'},
           {id: '9', key: 'september'},
           {id: '10', key: 'october'},
           {id: '11', key: 'november'},
           {id: '12', key: 'december'}];
	userDate = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11','12', '13','14', '15','16', '17','18', '19','210', '21','22', '23','24', '25','26', '27','28', '29','30', '31'];
	userYear = ['1940', '1941', '1942', '1943', '1944', '1945', '1946', '1947', '1948', '1949', '1950', '1951', '1952', '1953', '1954', '1955', '1956', '1957', '1958', '1959', '1960', '1961', '1962', '1963', '1964', '1965', '1966', '1967', '1968', '1969', '1970', '1971', '1972', '1973', '1974', '1975', '1976', '1977', '1978', '1979', '1980', '1981', '1982', '1983', '1984', '1985', '1986', '1987', '1988', '1989', '1990', '1991', '1992', '1993', '1994', '1995', '1996', '1997', '1998', '1999', '2000'];

  ngOnInit() {
  }

  onSubmit() {
    this.register(this.model.email,this.model.password,this.model.month,this.model.day,this.model.year, this.model.profile);
	if(this.model.profile==="PROFESSIONAL"){
		this.onsucsessMsg="Edit your profile and upload some fotos and videos for a better experiencies";
	}else{
		this.onsucsessMsg="Set your preferences for a better experience";
	}
  }
  register(userEmail, password, month, day, year, profile) {
	  let body = { 
		  "email" : userEmail,
		  "password" : password,
		  "birthdate" : {
			   "year" : year,
			   "month" : month,
			   "day" : day
			},
			"userType" : profile
		}
	  let headers = new Headers({ 'Content-Type': 'application/json' });
	  let options = new RequestOptions({ headers: headers });
	
	  this.http[environment.api.register.method]
		(environment.api.register.url, JSON.stringify(body), options)
		.map(response =>response.json())
		.subscribe(
		  response  => {	
                if(response.status == "BAD_REQUEST"){
					this.errorMessage = response.errors[0];
				}else{
					this.submitted = true;					
				}
		  },
          error =>  {this.errorMessage = '';this.submitted = false;}
		);
	}
	onChangeInput(){
		this.errorMessage="";
	}
	openLoginPopup(){
		$(".signup-modal-box").modal("hide");
        $(".login-modal-box").modal("show");
        this.submitted = false;
	}

}
