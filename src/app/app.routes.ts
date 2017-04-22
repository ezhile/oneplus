import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home.page';
import { ProfilePage } from './pages/profile/profile.page';
import { ViewPage } from './pages/view/view.page'; 
import { EditPage } from './pages/edit/edit.page';

export const appRoutes: Routes = [
  { path: 'home', component: HomePage },
  { 
      path: 'profile', 
      component: ProfilePage,
      children:[
          { path: '', redirectTo: 'view', pathMatch: 'full'},
          { path: 'view', component: ViewPage },
          { path: 'edit', component: EditPage }
      ]
  },
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: '**', component: HomePage }
];