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

  constructor() { }

  ngOnInit() {
  }
    
  model = new RegisterUser('','','','','','','');
  submitted = false;
  errorMessage = "";
  onSubmit() {
    this.submitted = true;
    //this.authenticate(this.model.username, this.model.password);
  }

}
