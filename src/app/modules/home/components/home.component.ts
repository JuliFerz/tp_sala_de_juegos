import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  public email!: string;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.email = this.authService.getCurrentUser()?.email!;
  }

  ngOnDestroy(): void {
    console.log('HomeComponent destroyed');
  }
}
