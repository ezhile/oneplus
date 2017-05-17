import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home.page';
import { ProfilePage } from './pages/profile/profile.page';
import { ViewPage } from './pages/view/view.page'; 
import { EditCustomerPage } from './pages/edit-customer/edit-customer.page';
import { EditProfessionalPage } from './pages/edit-professional/edit-professional.page';
 
export const appRoutes: Routes = [
  { path: 'home', component: HomePage },
  { 
      path: 'profile', 
      component: ProfilePage,
      children:[
          { path: '', redirectTo: 'view', pathMatch: 'full'},
          { path: 'view', component: ViewPage },
          { path: 'editCustomer', component: EditCustomerPage },
          { path: 'editProfessional', component: EditProfessionalPage }
      ]
  },
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: '**', component: HomePage }
];