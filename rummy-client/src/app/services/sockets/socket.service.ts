// src/app/socket.service.ts
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
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
   
  connect(token: string): void {
    if (!this.socket?.connected) {
      this.socket = io(this.url, {
        path: '/socket.enarmas',
        transports: ['websocket', 'polling'],
        reconnection: true,
        reconnectionAttempts: 5,
        query: { token }
      });

      this.socket.on("connect", () => {
        console.log('Connecting with id:', this.socket.id);
      });

      this.socket.on('connect_error', (err) => {
        // the reason of the error, for example "xhr poll error"
        console.log(err.message);
        // some additional description, for example the status code of the initial HTTP response
        console.log((<any>err).description);
        // some additional context, for example the XMLHttpRequest object
        console.log((<any>err).context);
      });

      this.socket.on('error', (object: any) => {
        this.dialog.open(ErrorDialogComponent, {
          data: { error: object.error, message: object.from }
        });
      });

    }
  }

  // Disconnect the socket
  public disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
