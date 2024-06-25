import { Card } from "./card.model";
import { Hand } from "./hand.model";
import { Player } from "./player.model";

/**
 * Classe de joueur
 */
export class PlayerGame extends Player {

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

  constructor(init?: Partial<PlayerGame>) {
    super();
    Object.assign(this, init);
  }
} 
