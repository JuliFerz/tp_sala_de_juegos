import { Component } from '@angular/core';
import { HangmanInterface } from 'src/app/interfaces/hangman.interface';
import { LetterInterface } from 'src/app/interfaces/letter.interface';

@Component({
  selector: 'app-hangman',
  templateUrl: './hangman.component.html',
  styleUrl: './hangman.component.css'
})
export class HangmanComponent {
  public words: HangmanInterface[] = [
    { word: 'Arbol', active: true },
    { word: 'Coche', active: true },
    { word: 'Estrella', active: true },
    { word: 'Laboratorio', active: true },
    { word: 'Oficina', active: true },
    { word: 'Pizarron', active: true },
    { word: 'Casa', active: true },
    { word: 'Gato', active: true },
    { word: 'Monitor', active: true },
    { word: 'Computadora', active: true },
    { word: 'Teclado', active: true },
    { word: 'Piano', active: true },
    { word: 'Escalera', active: true },
    { word: 'Triangulo', active: true },
  ];

  public gallowsImg: number = 0;
  public lifeMax: number = 6;
  public gameEnded: boolean = false;
  public win: boolean = false;
  public running: boolean = false;
  public gameWord!: string;
  public letters: LetterInterface[] = [
    { letter: 'A', active: true },
    { letter: 'B', active: true },
    { letter: 'C', active: true },
    { letter: 'D', active: true },
    { letter: 'E', active: true },
    { letter: 'F', active: true },
    { letter: 'G', active: true },
    { letter: 'H', active: true },
    { letter: 'I', active: true },
    { letter: 'J', active: true },
    { letter: 'K', active: true },
    { letter: 'L', active: true },
    { letter: 'M', active: true },
    { letter: 'N', active: true },
    { letter: 'Ñ', active: true },
    { letter: 'O', active: true },
    { letter: 'P', active: true },
    { letter: 'Q', active: true },
    { letter: 'R', active: true },
    { letter: 'S', active: true },
    { letter: 'T', active: true },
    { letter: 'U', active: true },
    { letter: 'V', active: true },
    { letter: 'W', active: true },
    { letter: 'X', active: true },
    { letter: 'Y', active: true },
    { letter: 'Z', active: true },
  ]
  public word: LetterInterface[] = [];

  constructor() { }

  setGame() {
    const availableWords = this.words.filter(word => word.active);
    this.gameWord = availableWords[Math.trunc(Math.random() * (availableWords.length))].word;
    this.gallowsImg = 0;
    this.lifeMax = 6;
    this.word = [];
    this.letters.forEach(objLetter => objLetter.active = true);
    for (let i = 0; i < this.gameWord.length; i++) {
      this.word.push({ letter: this.gameWord[i].toUpperCase(), active: true, show: false });
    }
  }

  onClickStartGame(): void {
    this.running = true;
    this.setGame();
  }

  onClickRestart(): void {
    if (this.win && this.gameEnded){
      this.words.forEach(wordObj => {
        if (this.gameWord == wordObj.word) {
          wordObj.active = false;
        }
      })
      this.win = false;
    }
    this.gameEnded = false;
    this.setGame();
  }

  onClickLetter(obj: LetterInterface): void {
    if (!obj.active) return;
    let isLetterInWord: boolean = false;
    obj.active = false;

    this.word.forEach(wordObj => {
      if (wordObj.letter == obj.letter) {
        wordObj.show = true;
        isLetterInWord = true;
      }
    });
    const inputWordLen = this.word.filter(word => word.show).length;

    if (inputWordLen == this.word.length) {
      this.gameEnded = true;
      this.win = true;
      return;
    }

    if (!isLetterInWord) {
      this.lifeMax--;
      this.gallowsImg++
      if (this.lifeMax === 0) {
        this.gameEnded = true;
        return;
      };
    }
  }

}
