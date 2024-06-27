import { Injectable } from '@angular/core';
import { Invitation } from '../../models/invitation/invitation.model';
import { Response } from '../../models/invitation/response.model';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root'
})
export class InvitationSocketService {

  constructor(private socketService: SocketService) {
  }

  /**
   * Envoie une demande d'invitation à un joueur.
   * @param invitation L'invitation à envoyer
   */
  sendInvitationRequest(invitation: Invitation): void {
    this.socketService.socket.emit('invitation:send-request', invitation);
  }

  /**
   * Ecoute les demandes d'invitation entrantes.
   * @param callBack Fonction de rappel appelée lorsqu'une invitation est reçue
   */
  receiveInvitationRequest(callBack: (invitation: Invitation) => void): void {
    this.socketService.socket.on('invitation:receive-request', (invitation: Invitation) => {
      callBack(invitation);
    });
  }

  /**
   * Envoie une réponse à une invitation.
   * @param response La réponse à envoyer
   */
  sendInvitationResponse(response: Response): void {
    this.socketService.socket.emit('invitation:send-response', response);
  }

  /**
   * Ecoute les réponses aux invitations entrantes.
   * @param callBack Fonction de rappel appelée lorsqu'une réponse est reçue
   */
  receiveInvitationResponse(callBack: (response: Response) => void): void {
    this.socketService.socket.on('invitation:receive-response', (response: Response) => {
      callBack(response);
    });
  }

}
