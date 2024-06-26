import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { URL_API } from '../resources/const';
import { ServicesHelper } from '../resources/helpers/services.helper';
import { Player } from '../models/player.model';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private apiUrl = URL_API;

  constructor(private http: HttpClient) { }

  getAllPlayerConnected(playerId: number): Observable<Player[]> {
    return this.http.get(`${this.apiUrl}/players/allplayerconnected/${playerId}`, { headers: ServicesHelper.getHttpHeaders() })
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(ServicesHelper.handleError)
      );
  }

}
