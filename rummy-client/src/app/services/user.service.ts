import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { URL_API } from '../resources/const';
import { ServicesHelper } from '../resources/helpers/services.helper';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = URL_API; 

  constructor(private http: HttpClient) {}

  getUserById(userId: number): Observable<string> {
    return this.http.get(`${this.apiUrl}/users/${userId}`, {  headers: ServicesHelper.getHttpHeaders() })
    .pipe(
      map((response: any) => {
        if (response) {
          return response.username;
        }        
      }),
      catchError(ServicesHelper.handleError)         
    );
  }
   
}
