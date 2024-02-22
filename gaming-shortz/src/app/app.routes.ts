import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ModalComponent } from './shared/modal/modal.component';
import { LoginComponent } from './auth/login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { UploadComponent } from './components/upload/upload.component';
import { ClipComponent } from './components/clip/clip.component';
import { ManageComponent } from './components/manage/manage.component';
import { authGuard } from './auth.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AboutComponent } from './components/about/about.component';

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
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'upload',
    component: UploadComponent,
    canActivate: [authGuard],
  },
  {
    path: 'clip/:id',
    component: ClipComponent,
    canActivate: [authGuard],
  },
  {
    path: 'manage',
    component: ManageComponent,
    canActivate: [authGuard],
  },
  {
    path: '**',
    pathMatch: 'full',
    component: NotFoundComponent,
  },
];
