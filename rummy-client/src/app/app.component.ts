import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { AppContexte } from './resources/helpers/app-contexte.helper';
import { ComponentBase } from './resources/component-base';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends ComponentBase implements OnInit {
  title = 'Rummy Game';

  constructor(public authService: AuthService, private router: Router, private app: AppContexte, dialog: MatDialog) {
    super(dialog);
  }

  ngOnInit(): void { }

  logout(): void {
    this.authService.logout(this.app.player.userId).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err) => this.errorManager(err.message)
    });
  }

  ngOnDestroy(): void {
    //this.app.disconnectSocket();
  }
}
