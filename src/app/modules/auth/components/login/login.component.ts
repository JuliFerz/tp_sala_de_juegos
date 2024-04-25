import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../../services/auth.service';
import Swal from 'sweetalert2'


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


  onLogin(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.authService.login(this.loginForm.value)
      .then(res => {
        Swal.fire({
          title: "Usuario encontrado!", text: "Accediendo al portal...", icon: "success", confirmButtonText: 'Continuar'
        }).then((result) => {
          if (result.isConfirmed) {
            // Swal.fire("Saved!", "", "success");
            this.router.navigateByUrl('/home');
          }
        });
        // this.router.navigateByUrl('/home');
      }).catch(err => {
        this.errorMessage = err;
        Swal.fire({
          title: 'Error!', text: `Las credenciales son inválidas.\n${this.errorMessage}`, icon: 'error', confirmButtonText: 'Reintentar'
        })
      })

    this.loginForm.reset({ email: '', password: '' });
  }
}
