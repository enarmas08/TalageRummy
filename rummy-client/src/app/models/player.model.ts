import { Card } from "./card.model";
import { Hand } from "./hand.model";

/**
 * Classe de joueur
 */
export class Player {

  /**
   * obtient ou définie 
   */
  public hand!: Hand;

  /**
   * obtient ou définie 
   */
  public isMyTurn!: boolean;

  /**
   * obtient ou définie 
   */
  public isReady!: boolean;

  /**
   * obtient ou définie 
   */
  public userId!: boolean;

  constructor(init?: Partial<Player>) {
    Object.assign(this, init);
  }
} 
