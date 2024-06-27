import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppContexte } from 'src/app/resources/helpers/app-contexte.helper';
import { Player } from '../../models/player.model';
import { ComponentBase } from '../../resources/component-base';
import { LobbySocketService } from '../../services/sockets/lobby.socket.service';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { PlayerService } from '../../services/player.service';
import { SendInvitationDialogComponent } from '../invitaion/send-invitation-dialog/send-invitation-dialog.component';
import { InvitationSocketService } from '../../services/sockets/invitation.socket.service';
import { Invitation } from '../../models/invitation/invitation.model';
import { ReceiveInvitationDialogComponent } from '../invitaion/receive-invitation-dialog/receive-invitation-dialog.component';

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
export class LobbyComponent extends ComponentBase implements OnInit, OnDestroy {

  message!: string;

  players: Player[] = [];
  playersInRows: Player[][] = [];
  constructor(private lobbySocketService: LobbySocketService, private playerService: PlayerService, private app: AppContexte, dialog: MatDialog,
    private invitationSocketService: InvitationSocketService) {
    super(dialog);
  }

  ngOnInit(): void {
    this.getAllPlayerConnected()
      .then(() => {
        this.setupSocketListeners();
      })
      .catch(err => this.managerError(err));
  }

  ngOnDestroy(): void {
    this.lobbySocketService.playerExitFromLobby(this.app.player.id);
  }

  openReceiveInvitationDialog(invitaiton: Invitation): void {
    const dialogRef = this.dialog.open(ReceiveInvitationDialogComponent, {
      width: '500px',
      disableClose: true,
      data: invitaiton
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The ReceiveInvitationDialog was closed');
    });
  }

  openSendInvitationDialog(player: Player): void {
    const data: Invitation = new Invitation({ fromPlayer: this.app.player, toPlayer: player });
    const dialogRef = this.dialog.open(SendInvitationDialogComponent, {
      width: '500px',
      disableClose: true,
      data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.isAccepted) {
        // TODO: handle game start logic
      }
    });
  }

  private setupSocketListeners(): void {

    this.playerAdded();

    this.playerDeleted();

    this.receiveInvitationRequest();

    this.lobbySocketService.playerJoinLobby(this.app.player);

  }

  private getAllPlayerConnected(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.playerService.getAllPlayerConnected(this.app.player.id)
        .subscribe({
          next: players => {
            this.players = players;
            this.playersInRows = this.chunk(this.players, 7);

            resolve();
          },
          error: err => reject(err)
        });
    });
  }

  private receiveInvitationRequest(): void {
    this.invitationSocketService.receiveInvitationRequest((invitaiton: Invitation) => {
      this.openReceiveInvitationDialog(invitaiton);
    });
  }

  private playerAdded(): void {
    this.lobbySocketService.playerAdded(player => {
      if (!this.players.some(p => player.id == p.id)) {
        this.players.push(player);
        this.playersInRows = this.chunk(this.players, 7);
      }
    });
  }

  private playerDeleted(): void {
    this.lobbySocketService.playerDeleted(playerId => {
      this.players = this.players.filter(p => p.id !== playerId);
      this.playersInRows = this.chunk(this.players, 7);
    });
  }

  private chunk(arr: Player[], chunkSize: number): Player[][] {
    const result: Player[][] = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      result.push(arr.slice(i, i + chunkSize));
    }
    return result;
  }

}
