import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ModalComponent } from './shared/modal/modal.component';
import { LoginComponent } from './auth/login/login.component';

export const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
    ],
  },
];
