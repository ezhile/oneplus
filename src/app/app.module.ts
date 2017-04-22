import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Http, HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateLoader } from 'ng2-translate';

import { createTranslateLoader } from './app.lang.loader';
import { appRoutes } from './app.routes'; 
import { AppComponent } from './app.component';
import { HomePage } from './pages/home/home.page';
import { ProfilePage } from './pages/profile/profile.page';
import { ViewPage } from './pages/view/view.page'; 
import { EditPage } from './pages/edit/edit.page';
import { LoginComponent } from './components/login/login.component'; 
import { SignupComponent } from './components/signup/signup.component';
import { SubscribeComponent } from './components/subscribe/subscribe.component';
import { PwdValidator } from '../validators/password.validator';

@NgModule({
  declarations: [
    AppComponent,
    HomePage, 
	ProfilePage,
	ViewPage,
	EditPage,
    LoginComponent,
    SignupComponent,
    SubscribeComponent,
    PwdValidator
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpModule,
    TranslateModule.forRoot({
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
    })
  ], 
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


