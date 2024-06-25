import { Card } from "./card.model";

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
