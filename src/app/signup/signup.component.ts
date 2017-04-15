import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions  } from '@angular/http';
import 'rxjs/add/operator/map';
import { RegisterUser }    from './registerUser';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private http: Http) { }
	userMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November','December'];
	userDate = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11','12', '13','14', '15','16', '17','18', '19','210', '21','22', '23','24', '25','26', '27','28', '29','30', '31'];
	userYear = ['1940', '1941', '1942', '1943', '1944', '1945', '1946', '1947', '1948', '1949', '1950', '1951', '1952', '1953', '1954', '1955', '1956', '1957', '1958', '1959', '1960', '1961', '1962', '1963', '1964', '1965', '1966', '1967', '1968', '1969', '1970', '1971', '1972', '1973', '1974', '1975', '1976', '1977', '1978', '1979', '1980', '1981', '1982', '1983', '1984', '1985', '1986', '1987', '1988', '1989', '1990', '1991', '1992', '1993', '1994', '1995', '1996', '1997', '1998', '1999', '2000'];

  ngOnInit() {
  }
    
  model = new RegisterUser('','','','','','','');
  submitted = false;
  errorMessage = "";
  onSubmit() {
    this.submitted = true;
    this.authenticate(this.model.email, this.model.password);
  }
  authenticate(userEmail,password) {
	  let body = { "username" : userEmail, "password" : password};
	  let headers = new Headers({ 'Content-Type': 'application/json' });
	  let options = new RequestOptions({ headers: headers });
	
	  this.http
		.post('http://46.38.242.27:8082/api/login', body, options)
		.map(response => response.json())
		.subscribe(
		  response  => {console.log(response);this.submitted = false;},
          error =>  {this.errorMessage = <any>error;this.submitted = false;}
		);
	}

}
