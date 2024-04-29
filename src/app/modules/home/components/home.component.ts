import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: ``
})
export class HomeComponent implements OnInit {
  public email!: string;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.email = this.authService.getCurrentUser()?.email!;
  }

}
