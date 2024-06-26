import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppContexte } from 'src/app/resources/helpers/app-contexte.helper';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { Player } from '../../models/player.model';
import { ComponentBase } from '../../resources/component-base';
import { LobbySocketService } from '../../services/sockets/lobby.socket.service';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss'],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(-20px)' }),
          stagger('50ms', [
            animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class LobbyComponent extends ComponentBase implements OnInit {

  username!: string;
  message!: string;
  errorMessage!: string;

  players: Player[] = [];
  playersInRows: Player[][] = [];

  constructor(private lobbySocketService: LobbySocketService, private playerService: PlayerService, private app: AppContexte, dialog: MatDialog) {
    super(dialog);
  }

  ngOnInit(): void {
    this.getAllPlayerConnected();

    this.lobbySocketService.playerAdded((player) => {
      if (!this.players.some(p => player.id == p.id)) {
        this.players.push(player);
        this.playersInRows = this.chunk(this.players, 7);
      }
    });

    this.lobbySocketService.playerDeleted((playerId) => {
      this.players = this.players.filter(p => p.id !== playerId);
      this.playersInRows = this.chunk(this.players, 7);
    });

    this.lobbySocketService.playerJoinLobby(this.app.player);
  }

  private getAllPlayerConnected(): void {
    this.playerService.getAllPlayerConnected(this.app.player.id)
      .subscribe({
        next: (players) => {
          this.players = players;
          this.playersInRows = this.chunk(this.players, 7);
        },
        error: (err) => this.errorManager(err.message)
      });
  }

  private chunk(arr: Player[], chunkSize: number): Player[][] {
    const result: Player[][] = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      result.push(arr.slice(i, i + chunkSize));
    }
    return result;
  }

  //onSubmit(): void {
  //  this.userService.getUserById(this.app.player.userId).subscribe({
  //    next: (username) => this.username = username,
  //    error: (err) => this.errorManager('Invalid login credentials : ' + err.message)
  //  });
  //}

  ngOnDestroy(): void {
    this.lobbySocketService.playerExitFromLobby(this.app.player.id);
  }
}
