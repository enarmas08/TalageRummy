import { Card } from "./card.model";
import { Hand } from "./hand.model";
import { PlayerGame } from "./player-game.model";

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
  public players: PlayerGame[] = [];

  /**
  * obtient ou définie 
  */
  public playerTurn!: PlayerGame;

  constructor(init?: Partial<Round>) {
    Object.assign(this, init);
  }
} 
