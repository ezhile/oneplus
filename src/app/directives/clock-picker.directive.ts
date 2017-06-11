import { Directive, ElementRef, Input, Renderer } from '@angular/core';
declare  var $:any;

@Directive({ selector: '[clock-picker]' })
export class ClockPickerDirective {

    constructor(public el: ElementRef, public renderer: Renderer) {}

    ngOnInit(){
        $(this.el.nativeElement).clockpicker();
    }
}