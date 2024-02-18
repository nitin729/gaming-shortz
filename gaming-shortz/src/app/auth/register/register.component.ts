import { Component } from '@angular/core';
import { ContainerComponent } from '../../shared/container/container.component';
import {
  Form,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { InputComponent } from '../../shared/input/input.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ContainerComponent,
    FormsModule,
    ReactiveFormsModule,
    InputComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  constructor(private fb: FormBuilder, private authService: AuthService) {}
  name = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm),
  ]);
  confirmPassword = new FormControl('', [Validators.required]);
  registerForm = this.fb.group({
    name: this.name,
    email: this.email,
    password: this.password,
    confirmPassword: this.confirmPassword,
  });

  register() {
    console.log(this.registerForm.value);
    this.authService.createAccount(
      this.email.value as string,
      this.password.value as string,
      this.name.value as string
    );
  }
}
