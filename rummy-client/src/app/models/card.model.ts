import { CardType } from "./enums/cardType.model";

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
