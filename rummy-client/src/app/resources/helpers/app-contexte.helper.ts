import { Injectable } from "@angular/core";
import { User } from "src/app/models/user.model";
import { io, Socket } from 'socket.io-client';
import { URL_SERVER } from "../const";
import { SocketService } from "../../services/sockets/socket.service";
import { Player } from "../../models/player.model";


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
  public player!: Player;

  constructor(private socketService: SocketService) { }

  /**
   * déconnecté la socket
   */
  public disconnectSocket(): void {
    this.socketService.disconnect();
  }

}
