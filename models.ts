/**
 * Classe de carte
 */
export class Card {

  /**
   * obtient ou définie 
   */
  public value!: number;

  /**
   * obtient ou définie 
   */
  public type!: CardType;

  constructor(init?: Partial<Card>) {
    Object.assign(this, init);
  }
} 

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


/**
 * Classe de la main de joureur
 */
export class Hand {

  /**
   * obtient ou définie 
   */
  public cards: Card[] = [];

  /**
   * obtient ou définie 
   */
  public suivi: Card[][] = [];

  /**
   * obtient ou définie 
   */
  public trio: Card[][] = [];

  /**
   * obtient ou définie les cartes qui ne sont pas dans une suivi ou trio
   */
  public deadwood: Card[] = [];

  constructor(init?: Partial<Hand>) {
    Object.assign(this, init);
  }
} 


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

/**
 * Enume de type de la carte
 */
export enum CardType {
  PEAK,
  HEART,
  CROSS,
  DIAMONDS,
  JOKER
}

/**
 * Enume de type du jeu
 */
export enum gameType {
  SAMPLE,
  TALAGE
}
