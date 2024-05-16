import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { from, Observable } from 'rxjs';
import { DeckInterface } from '../interfaces/deck.interface';
import { CardInterface } from '../interfaces/card.interface';


@Injectable({
  providedIn: 'root'
})
export class CardService {
  constructor(private http: HttpClient) { }

  createNewDeck(): Observable<DeckInterface> {
    return from(this.http.post('https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1', {})) as Observable<DeckInterface>
  }

  drawCard(deck_id: string, count: number): Observable<CardInterface> {
    return from(this.http.get(`https://www.deckofcardsapi.com/api/deck/${deck_id}/draw/?count=${count}`)) as Observable<CardInterface>
  }
}
