import { Directive, ElementRef, Input, Renderer } from '@angular/core';

@Directive({ selector: '[starRating]' })
export class StarRatingDirective {

    constructor(public el: ElementRef, public renderer: Renderer) {}

    @Input() starRating: number;

    ngOnInit(){
        if(this.starRating) {
            var starElems = this.el.nativeElement.getElementsByTagName("i");
            
            for (let i = 0; i < this.starRating; i++) {
                console.log(starElems[i].className);
                starElems[i].className+=" checked";
            }
            
        }
    }
}