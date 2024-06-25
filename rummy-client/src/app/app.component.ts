import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { AppContexte } from './resources/helpers/app-contexte.helper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Rummy Game';

  constructor(public authService: AuthService, private router: Router, private app: AppContexte) { }

  ngOnInit(): void {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.app.disconnectSocket();
  }
}
