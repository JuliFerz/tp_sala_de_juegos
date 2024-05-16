import { CardsInterface } from "./cards.interface";

export interface CardInterface {
  success: boolean;
  deck_id: string;
  cards: CardsInterface[];
  remaining: number;
}