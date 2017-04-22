import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home.page';
import { ProfilePage } from './pages/profile/profile.page';
import { EditprofilePage } from './pages/editprofile/editprofile.page';

export const appRoutes: Routes = [
  { path: 'home', component: HomePage },
  { path: 'profile', component: ProfilePage },
  { path: 'editprofile', component: EditprofilePage },
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: '**', component: HomePage }
];