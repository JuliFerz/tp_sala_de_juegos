import { CardsImageInterface } from "./card-image.interface";

export interface CardsInterface {
  code: string;
  image: string;
  images: CardsImageInterface,
  value: string;
  suit: string;
}