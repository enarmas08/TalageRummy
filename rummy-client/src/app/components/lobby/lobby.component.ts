import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppContexte } from 'src/app/resources/helpers/app-contexte.helper';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { ComponentBase } from '../../resources/component-base';
import { ErrorHandlingService } from '../../services/error-handling.service';
import { LobbySocketService } from '../../services/sockets/lobby.socket.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent extends ComponentBase implements OnInit {

  username!: string;
  message!: string;
  errorMessage!: string;

  constructor(private lobbySocketService: LobbySocketService, private userService: UserService, private app: AppContexte, dialog: MatDialog) {
    super(dialog);
  }

  ngOnInit(): void {
    this.onSubmit();

    this.lobbySocketService.messageFromLobby((message) => this.message = message);
    this.lobbySocketService.playerJoinLobby(this.app.userId);

  }

  onExit(): void {
    this.lobbySocketService.playerExitFromLobby(this.app.userId);
  }

  onSubmit(): void {
    this.userService.getUserById(this.app.userId).subscribe({
      next: (username) => this.username = username,
      error: (err) => this.errorManager('Invalid login credentials : ' + err.message)
    });
  }

}
