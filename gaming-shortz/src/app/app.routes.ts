import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ModalComponent } from './shared/modal/modal.component';
import { LoginComponent } from './auth/login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  /*  {
    path: '',
    component: LayoutComponent,
  }, */
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
];
