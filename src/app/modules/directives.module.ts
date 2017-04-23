import { NgModule } from '@angular/core';

import { StarRatingDirective } from '../directives/star-rating.directive';

@NgModule({
    declarations: [
        StarRatingDirective
    ],
    exports: [
        StarRatingDirective
    ]
})
export class DirectivesModule{}