import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { io, Socket } from 'socket.io-client';
import { ErrorDialogComponent } from '../../components/error-dialog/error-dialog.component';
import { URL_SERVER } from '../../resources/const';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  public socket!: Socket;
  private readonly url: string = URL_SERVER; // URL de votre serveur Socket.IO

  constructor(private dialog: MatDialog) {
  }

  /**
   * Établit la connexion avec le serveur Socket.IO en utilisant le token d'authentification.
   * @param token Le token d'authentification
   */
  connect(token: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (!this.socket?.connected) {
        this.socket = io(this.url, {
          path: '/socket.enarmas',
          transports: ['websocket', 'polling'],
          reconnection: true,
          reconnectionAttempts: 5,
          query: { token }
        });

        // Événement de connexion réussie
        this.socket.on("connect", () => {
          console.log('Connected with id:', this.socket.id);
          resolve();
        });

        // Événement en cas d'erreur de connexion
        this.socket.on('connect_error', (err: any) => {
          console.log('Connection error:', err.message);
          console.log('Connection error description:', err.description);
          console.log('Connection error context:', err.context);
          // Affichage d'un dialogue d'erreur à l'utilisateur
          this.dialog.open(ErrorDialogComponent, {
            data: { error: err.message, message: err.description }
          });

          reject();
        });

        // Événement générique d'erreur du socket
        this.socket.on('error', (object: any) => {
          this.dialog.open(ErrorDialogComponent, {
            data: { error: object.error, message: object.from }
          });
          reject();
        });
      }
    });
  }

  /**
   * Associe l'ID du joueur avec l'ID du socket pour une identification précise.
   * @param playerId L'ID du joueur à associer avec l'ID du socket
   */
  associePlayerWithSocketId(playerId: number): void {
    if (this.socket?.connected) {
      this.socket.emit('associePlayerWithSocketId', playerId);
    } else {
      console.warn('Socket is not connected. Cannot associate player with socket ID.');
    }
  }

  /**
   * Déconnecte le socket.
   */
  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
