import { Card } from "./card.model";
import { GameType } from "./enums/gameType.enum";
import { PlayerGame } from "./player-game.model";
import { Round } from "./round.model";

/**
 * Classe du jeu
 */
export class Game {

  /**
   * obtient ou définie 
   */
  public players: PlayerGame[] = [];

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
  public gameType!: GameType;

  constructor(init?: Partial<Game>) {
    Object.assign(this, init);
  }
} 
