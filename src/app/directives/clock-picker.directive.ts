import { Directive, ElementRef, forwardRef, Renderer } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
declare  var $:any;

@Directive({
  selector: '[clock-picker]',
  providers: [{
    provide: NG_VALUE_ACCESSOR,useExisting: 
    forwardRef(() => ClockPickerDirective),
    multi: true
  }]
})
export class ClockPickerDirective implements ControlValueAccessor {
    value: string;

    constructor(protected el: ElementRef) {}

    ngAfterViewInit(){
        $(this.el.nativeElement).clockpicker().on('change', e => {
            this.onModelChange(e.target.value);
        });
    }
    
    onModelChange: Function = () => {};
    
    onModelTouched: Function = () => {};

    writeValue(val: string) : void {
        this.value = val;
    }
    
    registerOnChange(fn: Function): void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: Function): void {
        this.onModelTouched = fn;
    }
}