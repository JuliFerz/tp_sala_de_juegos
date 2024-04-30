import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  public email?: string;

  constructor(
    public authService: AuthService,
    private router: Router,
  ) { }

  receiveEmail(email: string) {
    this.email = email;
  }

  logout(): void {
    Swal.fire({
      title: "Cerrar Sesión",
      text: "¿Está seguro que desea desconectarse?",
      icon: "question",
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si',
    }).then((res) => {
      if (res.isConfirmed) {
        this.authService.logout()
          .then(() => this.router.navigateByUrl('auth/login'))
          .catch(err => console.log(err))
      }
    })
  }
}
