import { Injectable } from "@angular/core";
import { User } from "src/app/models/user.model";
import { io, Socket } from 'socket.io-client';
import { URL_SERVER } from "../const";
import { SocketService } from "../../services/sockets/socket.service";


/**
 * Contexte de l'application
 */
@Injectable({
  providedIn: 'root'
})
export class AppContexte {

  /**
   * Utilisateur connecté
   */
  public userId!: number;

  constructor(private socketService: SocketService) {

  }

  /**
   * déconnecté la socket
   */
  public disconnectSocket(): void {
    this.socketService.disconnect();
  }

}
