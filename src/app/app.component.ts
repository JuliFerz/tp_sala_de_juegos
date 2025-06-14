import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'gameRoom';

  constructor(private authService: AuthService) {
    this.authService.getCurrentUserApp();
  }
}
