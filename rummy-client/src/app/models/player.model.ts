import { Card } from "./card.model";
import { Hand } from "./hand.model";

/**
 * Classe de joueur
 */
export class Player {

  /**
 * obtient ou définie 
 */
  public id!: number;

  /**
  * obtient ou définie 
  */
  public username!: string;

  /**
   * obtient ou définie 
   */
  public userId!: number;

  /**
  * obtient ou définie 
  */
  public totalWin!: number;

  /**
  * obtient ou définie 
  */
  public totalLose!: number;

  constructor(init?: Partial<Player>) {
    Object.assign(this, init);
  }
} 
