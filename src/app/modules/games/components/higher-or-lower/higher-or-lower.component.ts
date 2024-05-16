import { Component, OnInit } from '@angular/core';

import { CardInterface } from 'src/app/interfaces/card.interface';
import { CardService } from 'src/app/services/card.service';
import { DeckInterface } from 'src/app/interfaces/deck.interface';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-higher-or-lower',
  templateUrl: './higher-or-lower.component.html',
  styleUrl: './higher-or-lower.component.css'
})
export class HigherOrLowerComponent implements OnInit {
  public gameEnded: boolean = false;
  public win: boolean = false;
  public deck!: DeckInterface;
  public remaining: number = 0;
  public score: number = 0;
  public lifePoints: number = 5;
  public currentCard!: CardInterface;
  public guessCard!: CardInterface;
  public showCard: boolean = false;
  public resultMsg: string = '';
  public running: boolean = false;


  constructor(
    private cardService: CardService,
    public spinnerService: SpinnerService,
  ) { }

  getCardValue(value: string): number {
    let cardValue;
    switch (value) {
      case 'ACE':
        cardValue = 1;
        break;
      case 'JACK':
        cardValue = 11;
        break;
      case 'QUEEN':
        cardValue = 12;
        break;
      case 'KING':
        cardValue = 13;
        break;
      default:
        cardValue = Number(value);
        break;
    }
    return cardValue;
  }

  onClickStartGame(): void {
    this.spinnerService.show();
    this.cardService.drawCard(this.deck.deck_id, 1)
      .subscribe({
        next: (res) => {
          this.spinnerService.hide();
          this.currentCard = res;
          this.remaining = res.remaining;
          this.running = true;
        }
      })

    this.spinnerService.show();
    this.cardService.drawCard(this.deck.deck_id, 1)
      .subscribe({
        next: (res) => {
          this.spinnerService.hide();
          this.guessCard = res;
          this.remaining = res.remaining;
        }
      })
  }

  onClickCard(type: string): void {
    if (!this.running) return;
    this.showCard = true;

    let cardValue = this.getCardValue(this.currentCard.cards[0].value);
    let guessCardValue = this.getCardValue(this.guessCard.cards[0].value);

    switch (type) {
      case 'higher':
        if (cardValue < guessCardValue) {
          this.resultMsg = '✅ Correcto'
          this.score++;
        } else if (cardValue == guessCardValue) {
          this.resultMsg = 'Iguales'
        } else {
          this.resultMsg = '❌ Incorrecto'
          this.score--;
          this.lifePoints--;
        }
        break;
      case 'lower':
        if (cardValue < guessCardValue) {
          this.resultMsg = '❌ Incorrecto'
          this.score--;
          this.lifePoints--;
        } else if (cardValue == guessCardValue) {
          this.resultMsg = 'Iguales'
        } else {
          this.resultMsg = '✅ Correcto'
          this.score++;
        }
        break;
    }

    if (this.lifePoints === 0) {
      this.gameEnded = true;
    }

  }

  onClickContinue(): void {
    if (this.remaining == 0) {
      this.gameEnded = true;
      this.running = false;
      return;
    }

    this.currentCard = this.guessCard;
    this.cardService.drawCard(this.deck.deck_id, 1)
      .subscribe({
        next: (res) => {
          this.spinnerService.hide();
          this.guessCard = res;
          this.remaining = res.remaining;
        }
      })
    this.showCard = false;
  }

  onClickRestart(): void {
    this.spinnerService.show();
    this.gameEnded = false;
    this.score = 0;
    this.lifePoints = 5;
    this.showCard = false;
    this.resultMsg = '';
    this.running = true;
    this.cardService.createNewDeck().subscribe({
      next: (res) => {
        this.deck = res;
        this.remaining = this.deck.remaining;
        this.spinnerService.hide();
      },
      error: (err) => console.log(err)
    })
  }

  ngOnInit(): void {
    this.spinnerService.show();
    this.cardService.createNewDeck().subscribe({
      next: (res) => {
        this.deck = res;
        this.remaining = this.deck.remaining;
        this.spinnerService.hide();
      },
      error: (err) => console.log(err)
    })
  }

}
