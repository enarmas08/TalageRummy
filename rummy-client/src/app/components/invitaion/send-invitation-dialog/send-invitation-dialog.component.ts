import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GameType } from '../../../models/enums/gameType.enum';
import { Invitation } from '../../../models/invitation/invitation.model';
import { Response } from '../../../models/invitation/response.model';
import { InvitationSocketService } from '../../../services/sockets/invitation.socket.service';

@Component({
  selector: 'app-send-invitation-dialog',
  templateUrl: './send-invitation-dialog.component.html',
  styleUrls: ['./send-invitation-dialog.component.scss']
})
export class SendInvitationDialogComponent implements OnInit {

  gameType: typeof GameType = GameType;
  selectedGameType: GameType = GameType.SAMPLE;
  isSended: boolean = false;
  isAccepted?: boolean;

  constructor(
    public dialogRef: MatDialogRef<SendInvitationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Invitation,
    private invitationSocketService: InvitationSocketService
  ) { }


  ngOnInit(): void {

    this.receiveInvitationResponse();
  }

  sendInvitationRequest(): void {
    this.isSended = true;
    this.data.gameType = this.selectedGameType;
    this.invitationSocketService.sendInvitationRequest(this.data)
  }

  receiveInvitationResponse(): void {
    this.invitationSocketService.receiveInvitationResponse((response: Response) => {
      this.isAccepted = response.response;
    });
  }

  startGame(): void {
    this.dialogRef.close({ isAccepted: true });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
