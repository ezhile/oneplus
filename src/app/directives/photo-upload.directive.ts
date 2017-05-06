import { Directive, ElementRef, Renderer, Output, EventEmitter, HostListener, OnInit} from '@angular/core';
declare  var $:any;

@Directive({ selector: '[photo-upload]' })
export class PhotoUploadDirective implements OnInit {

    private nativeElement : Node;
    public inputElement : Element;

    @Output() onComplete: EventEmitter<string> = new EventEmitter<string>();

    
    constructor(public el: ElementRef, public renderer: Renderer) {
        this.nativeElement =  el.nativeElement;
    }

    @HostListener('click') onClick() {
        $(this.inputElement).trigger('click');
    }

    ngOnInit(){
        this.inputElement = this.renderer.createElement(this.nativeElement, "input");
        this.renderer.setElementAttribute(this.inputElement, "style", "display:none;");
        this.renderer.setElementAttribute(this.inputElement, "type", "file");
        this.renderer.setElementAttribute(this.inputElement, "accept", "image/x-png,image/gif,image/jpeg");
        this.renderer.listen(this.inputElement, "change", ( event ) => this.onImageUpload(event));
    }
    onImageUpload(e){
        let files = e.target.files;
        let file = files[0];
    
        if (files && file) {
            let reader = new FileReader();

            reader.onload =this.handleReaderLoaded.bind(this);

            reader.readAsBinaryString(file);
        }
    }
    handleReaderLoaded(readerEvt) {
        let binaryString = readerEvt.target.result;
        let base64textString= btoa(binaryString);
        this.onComplete.emit(base64textString);
    }
}