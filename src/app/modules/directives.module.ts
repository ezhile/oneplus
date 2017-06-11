import { NgModule } from '@angular/core';

import { StarRatingDirective } from '../directives/star-rating.directive';
import { PhotoUploadDirective } from '../directives/photo-upload.directive';
import { ClockPickerDirective } from '../directives/clock-picker.directive';

@NgModule({
    declarations: [
        StarRatingDirective,
        PhotoUploadDirective,
        ClockPickerDirective
    ],
    exports: [
        StarRatingDirective,
        PhotoUploadDirective,
        ClockPickerDirective
    ]
})
export class DirectivesModule{}