import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  user: { username: string, email: string, password: string } = { username: '', email: '', password: '' };
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {
  }

  onSubmit(): void {
    this.authService.register(this.user).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors de l\'inscription';
        console.error('Erreur lors de l\'inscription :', err);
      }
    });
  }
}
