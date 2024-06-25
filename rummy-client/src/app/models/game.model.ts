import { Card } from "./card.model";
import { gameType } from "./enums/gameType.model";
import { Player } from "./player.model";
import { Round } from "./round.model";

/**
 * Classe du jeu
 */
export class Game {

  /**
   * obtient ou définie 
   */
  public players: Player[] = [];

  /**
   * obtient ou définie 
   */
  public rounds: Round[] = [];

  /**
   * obtient ou définie 
   */
  public activeRound!: Round;

  /**
   * obtient ou définie 
   */
  public gameType!: gameType;

  constructor(init?: Partial<Game>) {
    Object.assign(this, init);
  }
} 
