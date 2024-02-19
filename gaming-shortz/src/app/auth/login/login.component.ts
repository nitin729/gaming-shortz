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
import { from, of, tap } from 'rxjs';

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

  async login() {
    let email = this.loginForm.controls['email'].value as string;
    let password = this.loginForm.controls['password'].value as string;
    let session = await this.authService.login(email, password);
    if (session) {
      this.authService.isLoggedIn.set(true);
      const user = from(this.authService.getCurrentUser());
      user.subscribe((user) => this.authService.user.set(user));
      this.route.navigate(['/']);
    }
  }
}
