import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  public loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
  public errorMessage: string | undefined;
  public showPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) { }


  isValidField(field: string): boolean | null {
    return this.loginForm.controls[field].errors
      && this.loginForm.controls[field].touched;
  }

  getFieldError(field: string): string | null {
    if (!this.loginForm.controls[field]) return null;

    const errors = this.loginForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Mínimo ${errors['minlength'].requiredLength} caracteres.`
        case 'email':
          return 'Formato inválido. Ejemplo: "foo@bar.com"'
      }
    }
    return null;
  }

  setUser(user: string) {
    switch (user) {
      case 'test':
        this.loginForm.setValue({ 'email': 'test@test.com', 'password': 'test123' });
        break;
      case 'maria':
        this.loginForm.setValue({ 'email': 'mmercedes@test.com', 'password': 'maria123' });
        break;
    }
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  toRegister(): void {
    this.router.navigateByUrl('auth/register');
  }

  onLogin(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.authService.login(this.loginForm.value)
      .subscribe({
        next: (res) => {
          Swal.fire({
            title: "¡Usuario encontrado!", text: "Accediendo al portal...", icon: "success", confirmButtonText: 'Continuar'
          }).then((result) => {
            if (result.isConfirmed) {
              this.loginForm.reset({ email: '', password: '' });
              this.router.navigateByUrl('/home');
            }
          });
        },
        error: (err) => {
          switch (err.code) {
            case 'auth/invalid-credential':
              this.errorMessage = 'Las credenciales son inválidas.'
              break;
            default:
              this.errorMessage = err;
              break;
          }
          Swal.fire({
            title: 'Error!', text: this.errorMessage, icon: 'error', confirmButtonText: 'Reintentar'
          })
        }
      })
  }
}
