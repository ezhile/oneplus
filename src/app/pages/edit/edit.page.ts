import { Component, OnInit } from '@angular/core';
import { EditCustomer } from '../../models/edit-customer.model';

@Component({
  selector: 'edit-page', 
  templateUrl: 'edit.page.html',
  styleUrls: ['edit.page.css']
})
export class EditPage implements OnInit {
    
    public base64textString:String="";
    public lat:any;
    public lng:any;
    public address:any;
    public getAdrress:string;
    constructor() {
        
    }

    model = new EditCustomer('', '','','');
    ngOnInit() {
        
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
    onAddressChange(e){
        console.log(this.address);
        console.log(e);
        this.getAdrress = e.formatted_address;
    }

    editCustomerSend(){
         console.log(this.address);
         console.log(this.getAdrress);
          console.log(this.lat);
          console.log(this.model.nickname);
          console.log(this.model.genderType);
          console.log(this.model.about);
          this.model.location={
            "address" : this.getAdrress,
            "longitude" : this.lng,
            "latitude" : this.lat
          }
          console.log(this.model.location);
    }
}
