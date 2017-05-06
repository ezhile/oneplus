import { Component, OnInit } from '@angular/core';
import { EditCustomer } from '../../models/edit-customer.model';
import { UserInfoService } from '../../services/user-info.service';
import { Http, Headers, RequestOptions  } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';
declare  var $:any;

@Component({
  selector: 'edit-professional-page', 
  templateUrl: 'edit-professional.page.html',
  styleUrls: ['edit-professional.page.css']
})
export class EditProfessionalPage implements OnInit {
    
    public base64textString:String="";

    constructor(private http: Http, private router: Router, private userInfoService: UserInfoService) {
        
    }

    model = new EditCustomer('', '','','');
    ngOnInit() {

    }
    triggerImageUpload(e){
         e.preventDefault();
         $("#profilePic:hidden").trigger('click');
    }
    imageUpload(evt){
        var files = evt.target.files;
        var file = files[0];
    
        if (files && file) {
            var reader = new FileReader();

            reader.onload =this._handleReaderLoaded.bind(this);

            reader.readAsBinaryString(file);
        }
    }
    _handleReaderLoaded(readerEvt) {

        var binaryString = readerEvt.target.result;
        this.base64textString= btoa(binaryString);
    }  
}
