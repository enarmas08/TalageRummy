import { GameType } from "../enums/gameType.enum";
import { Player } from "../player.model";

/**
 * Classe de joueur
 */
export class Invitation {

  /**
 * obtient ou définie 
 */
  public fromPlayer!: Player;

  /**
  * obtient ou définie 
  */
  public toPlayer!: Player;

  /**
   * obtient ou définie 
   */
  public gameType!: GameType;

  constructor(init?: Partial<Invitation>) {
    Object.assign(this, init);
  }
} 
