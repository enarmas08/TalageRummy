import { Injectable } from '@angular/core';
import { AppContexte } from '../../resources/helpers/app-contexte.helper';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root'
})
export class LobbySocketService {

  constructor(private socketService: SocketService) {
  }

  playerJoinLobby(playerID: number): void {
    this.socketService.socket.emit('joinLobby');
  }

  playerExitFromLobby(playerID: number): void {
    this.socketService.socket.emit('leaveLobby');
  }

  messageFromLobby(callBack: (message: string) => void): void {
    this.socketService.socket.on('message', (message: string) => {
      callBack(message);
    });

  }


}
