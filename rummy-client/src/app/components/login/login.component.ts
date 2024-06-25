import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  user: { username: string, password: string } = { username: '', password: '' };
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {
  }

  onSubmit(): void {
    this.authService.login(this.user).subscribe({
      next: () => this.router.navigate(['/lobby']),
      error: (err) => this.errorMessage = 'Invalid login credentials : ' + err.message
    });
  }
}
