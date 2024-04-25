import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'shared-logout',
  template: ``
})
export class LogoutComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    Swal.fire({
      title: "Cerrar Sesión",
      text: "¿Está seguro que desea desconectarse?",
      icon: "question",
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si',
    })
      .then((res) => {
        if (res.isConfirmed) {
          this.authService.logout()
            .then(() => this.router.navigateByUrl('auth/login'))
            .catch(err => console.log(err))
        } else {
          this.router.navigateByUrl('./');
        }
      })
  }
}
