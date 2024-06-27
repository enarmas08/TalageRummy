import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Invitation } from '../../../models/invitation/invitation.model';
import { Response } from '../../../models/invitation/response.model';
import { InvitationSocketService } from '../../../services/sockets/invitation.socket.service';

@Component({
  selector: 'app-receive-invitation-dialog',
  templateUrl: './receive-invitation-dialog.component.html',
  styleUrls: ['./receive-invitation-dialog.component.scss']
})
export class ReceiveInvitationDialogComponent implements OnInit {

  countdown: number = 20; // Initialiser le compteur à 10 secondes
  private countdownInterval: any;

  constructor(
    public dialogRef: MatDialogRef<ReceiveInvitationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Invitation,
    private invitationSocketService: InvitationSocketService
  ) { }

  ngOnInit(): void {
    this.startCountdown();
  }

  ngOnDestroy(): void {
    // Nettoyer l'intervalle lorsque le composant est détruit pour éviter les fuites de mémoire
    this.clearCountdownInterval();
  }

  acceptInvite(): void {
    const response: Response = new Response({ response: true, toPlayerId: this.data.fromPlayer.id });
    this.invitationSocketService.sendInvitationResponse(response);
    this.dialogRef.close();
  }

  refuseInvite(): void {
    const response: Response = new Response({ response: false, toPlayerId: this.data.fromPlayer.id });
    this.invitationSocketService.sendInvitationResponse(response);
    this.dialogRef.close();
  }

  private startCountdown(): void {
    this.countdownInterval = setInterval(() => {
      if (this.countdown > 0) {
        this.countdown--;
      } else {
        clearInterval(this.countdownInterval);
        this.refuseInvite();
      }
    }, 1000); // Décrémenter chaque seconde
  }

  private clearCountdownInterval(): void {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }
}
