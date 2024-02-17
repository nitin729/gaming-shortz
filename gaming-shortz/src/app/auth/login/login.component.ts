import { Component } from '@angular/core';
import { ContainerComponent } from '../../shared/container/container.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ContainerComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {}
