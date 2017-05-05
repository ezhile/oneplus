import { Directive, ElementRef, Input, Renderer, OnChanges} from '@angular/core';

@Directive({ selector: '[photo-upload]' })
export class PhotoUploadDirective implements OnChanges {

    constructor(public el: ElementRef, public renderer: Renderer) {}

    @Input() starRating: number;

    ngOnChanges(){
        
    }
}