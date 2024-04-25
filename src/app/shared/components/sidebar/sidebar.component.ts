import { Component } from '@angular/core';
import { MenuItem } from '../../../interfaces/sidebar.interfaces';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  /* public menuItems: MenuItem[] = [
    { title: 'Home', route: './home' },
    { title: 'Login', route: './login' },
    { title: 'Quien Soy', route: './profile' },
  ]; */

  constructor(public authService: AuthService) { }

}
