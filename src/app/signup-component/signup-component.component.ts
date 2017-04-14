import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions  } from '@angular/http';
import 'rxjs/add/operator/map';
import { RegisterUser }    from './registerUser';

@Component({
  selector: 'app-signup-component',
  templateUrl: './signup-component.component.html',
  styleUrls: ['./signup-component.component.css']
})
export class SignupComponentComponent implements OnInit {

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
