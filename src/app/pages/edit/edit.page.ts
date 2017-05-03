import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'edit-page', 
  templateUrl: 'edit.page.html',
  styleUrls: ['edit.page.css']
})
export class EditPage implements OnInit {
    
    private base64textString:String="";
    constructor() {
        
    }
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
}
