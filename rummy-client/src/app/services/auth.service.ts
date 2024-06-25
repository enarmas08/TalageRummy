import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { URL_API } from '../resources/const';
import { User } from '../models/user.model';
import { ServicesHelper } from '../resources/helpers/services.helper';
import { AppContexte } from '../resources/helpers/app-contexte.helper';
import { SocketService } from './sockets/socket.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = URL_API;

  constructor(private http: HttpClient, private appContexte: AppContexte, private socketService: SocketService) { }

  login(user: { username: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/login`, user).pipe(
      tap((response: any) => {
        if (response?.token) {
          localStorage.setItem('jwt', response.token);
          this.socketService.connect(response.token);
        }

        if (response?.userId) {
          this.appContexte.userId = response.userId;
        }
      }),
      catchError(ServicesHelper.handleError)
    );
  }

  register(user: { username: string, email: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/register`, user)
      .pipe(catchError(ServicesHelper.handleError));
  }

  logout(): void {
    localStorage.removeItem('jwt');
    this.socketService.disconnect();
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('jwt');
  }

  getToken(): string | null {
    return localStorage.getItem('jwt');
  }


}
