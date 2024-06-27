/**
 * Classe de réponse de l'invitation
 */
export class Response {

  /**
 * obtient ou définie 
 */
  public response!: boolean;

  /**
  * obtient ou définie 
  */
  public toPlayerId!: number;

  constructor(init?: Partial<Response>) {
    Object.assign(this, init);
  }
} 
