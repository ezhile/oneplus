import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home.page';
import { ViewProfilePage } from './pages/viewprofile/viewprofile.page';
import { EditProfilePage } from './pages/editprofile/editprofile.page';

export const appRoutes: Routes = [
  { path: 'home', component: HomePage },
  { path: 'viewprofile', component: ViewProfilePage },
  { path: 'editprofile', component: EditProfilePage },
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: '**', component: HomePage }
];