import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { AuthService } from 'src/app/services/auth.service';
import { SpinnerService } from 'src/app/services/spinner.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  public registerForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
  public errorMessage: string | undefined;
  public showPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    public spinnerService: SpinnerService,
  ) { }


  isValidField(field: string): boolean | null {
    return this.registerForm.controls[field].errors
      && this.registerForm.controls[field].touched;
  }

  getFieldError(field: string): string | null {
    if (!this.registerForm.controls[field]) return null;

    const errors = this.registerForm.controls[field].errors || {};

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

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  toLogin(): void {
    this.router.navigateByUrl('auth/login');
  }

  onRegister(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.spinnerService.show();
    this.authService.register(this.registerForm.value)
      .subscribe({
        next: () => {
          this.spinnerService.hide();
          Swal.fire({
            title: "¡Usuario creado con éxito!", text: "Accediendo al portal...", icon: "success", confirmButtonText: 'Continuar'
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigateByUrl('/home');
            }
          });
        },
        error: (err) => {
          switch (err.code) {
            case 'auth/email-already-in-use':
              this.errorMessage = 'El correo ingresado ya se encuentra en uso.'
              break;
            default:
              this.errorMessage = err;
              break;
          }

          Swal.fire({
            title: 'Error!', text: `Hubo un error al intentar crear el usuario.\n${this.errorMessage}`, icon: 'error', confirmButtonText: 'Reintentar'
          })

          this.registerForm.reset({ email: '', password: '' });
        }
      })
  }
}
