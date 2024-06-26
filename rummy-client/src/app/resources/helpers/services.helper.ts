import { HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { throwError } from "rxjs";

/**
 * Services Helper
 */
export class ServicesHelper {

  /**
   * Méthode de gestion d'erreur
   * @param error Erreur
   * @returns message
   */
  public static handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Erreur côté client
      console.error('Une erreur s\'est produite :', error.error.message);
    } else {
      // Erreur côté serveur
      console.error(
        `Code d'erreur : ${error.status}, ` +
        `message : ${error.error.message}`);
    }
    // Renvoyer un observable avec un message d'erreur convivial
    return throwError(() => 'Une erreur est survenue, veuillez réessayer plus tard.');
  }

  public static getHttpHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwt'); // Retrieve token from local storage
    return new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` });
  }
}
