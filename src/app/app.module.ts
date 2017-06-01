import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Http, HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateLoader } from 'ng2-translate';
import { GooglePlaceModule } from 'ng2-google-place-autocomplete';

import { createTranslateLoader } from './app.lang.loader';
import { appRoutes } from './app.routes'; 
import { AppComponent } from './app.component';
import { HomePage } from './pages/home/home.page';
import { ProfilePage } from './pages/profile/profile.page';
import { ViewPage } from './pages/view/view.page'; 
import { EditCustomerPage } from './pages/edit-customer/edit-customer.page';
import { EditProfessionalPage } from './pages/edit-professional/edit-professional.page';
import { LoginComponent } from './components/login/login.component'; 
import { SignupComponent } from './components/signup/signup.component';
import { SubscribeComponent } from './components/subscribe/subscribe.component';
import { EditCustomerComponent } from './components/edit-customer/edit-customer.component';
import { EditProfessionalComponent } from './components/edit-professional/edit-professional.component';
import { PreferenceCustomerComponent } from './components/preference-customer/preference-customer.component';
import { PreferenceProfessionalComponent } from './components/preference-professional/preference-professional.component';
import { PwdValidator } from './validators/password.validator';
import { UserInfoService } from './services/user-info.service';
import { DirectivesModule } from './modules/directives.module'; 
 import { IonRangeSliderModule } from "ng2-ion-range-slider";
 import { TagInputModule } from 'ng2-tag-input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed! 
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [
    AppComponent,
    HomePage, 
	  ProfilePage,
	  ViewPage,
	  EditCustomerPage,
    EditProfessionalPage,
    LoginComponent,
    SignupComponent,
    SubscribeComponent,
    EditCustomerComponent,
    EditProfessionalComponent,
    PreferenceCustomerComponent,
    PreferenceProfessionalComponent,
    PwdValidator
  ], 
  imports: [
    RouterModule.forRoot(appRoutes),
	NgbModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    TranslateModule.forRoot({
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
    }),
    GooglePlaceModule,
    DirectivesModule,
	IonRangeSliderModule,
	TagInputModule,
	BrowserAnimationsModule
  ], 
  providers: [UserInfoService],
  bootstrap: [AppComponent]
})
export class AppModule { }


