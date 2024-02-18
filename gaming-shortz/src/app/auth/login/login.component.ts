import { Component } from '@angular/core';
import { ContainerComponent } from '../../shared/container/container.component';
import { InputComponent } from '../../shared/input/input.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ContainerComponent, InputComponent, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private authService: AuthService, private route: Router) {}

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  login() {
    let email = this.loginForm.controls['email'].value as string;
    let password = this.loginForm.controls['password'].value as string;
    this.authService.login(email, password);
    this.route.navigate(['/']);
    const user = of(this.authService.getCurrentUser());
    user.subscribe((user) => console.log(user));
  }
}
