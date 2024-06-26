import { Injectable } from '@angular/core';
import { Player } from '../../models/player.model';
import { AppContexte } from '../../resources/helpers/app-contexte.helper';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root'
})
export class LobbySocketService {

  constructor(private socketService: SocketService) {
  }

  playerJoinLobby(player: Player): void {
    this.socketService.socket.emit('joinLobby', player);
  }

  playerExitFromLobby(playerId: number): void {
    this.socketService.socket.emit('leaveLobby', playerId);
  }

  playerAdded(callBack: (player: Player) => void): void {
    this.socketService.socket.on('playerAdded', (player: Player) => {
      callBack(player);
    });
  }

  playerDeleted(callBack: (playerId: number) => void): void {
    this.socketService.socket.on('playerDeleted', (playerId: number) => {
      callBack(playerId);
    });
  }


}
