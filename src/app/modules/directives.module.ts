import { NgModule } from '@angular/core';

import { StarRatingDirective } from '../directives/star-rating.directive';
import { PhotoUploadDirective } from '../directives/photo-upload.directive';

@NgModule({
    declarations: [
        StarRatingDirective,
        PhotoUploadDirective
    ],
    exports: [
        StarRatingDirective,
        PhotoUploadDirective
    ]
})
export class DirectivesModule{}