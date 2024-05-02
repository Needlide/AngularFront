import { Routes } from '@angular/router';
import { LoginViewComponent } from './login-view/login-view.component';
import { RegistrationViewComponent } from './registration-view/registration-view.component';
import { AboutViewComponent } from './about-view/about-view.component';

export const routes: Routes = [
  { path: 'Login', component: LoginViewComponent },
  { path: 'Registration', component: RegistrationViewComponent },
  { path: 'About', component: AboutViewComponent },
  { path: '', redirectTo: '/Login', pathMatch: 'full' },
];
