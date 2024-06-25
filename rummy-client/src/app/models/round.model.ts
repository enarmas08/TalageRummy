import { Card } from "./card.model";
import { Hand } from "./hand.model";
import { Player } from "./player.model";

/**
 * Classe de ronde
 */
export class Round {

  /**
   * obtient ou définie 
   */
  public cardsDeck: Card[] = [];

  /**
   * obtient ou définie 
   */
  public playedCardsDeck: Card[] = [];

  /**
  * obtient ou définie 
  */
  public players: Player[] = [];

  /**
  * obtient ou définie 
  */
  public playerTurn!: Player;

  constructor(init?: Partial<Round>) {
    Object.assign(this, init);
  }
} 
