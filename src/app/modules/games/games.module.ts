import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GamesRoutingModule } from './games-routing.module';
import { HangmanComponent } from './components/hangman/hangman.component';
import { HigherOrLowerComponent } from './components/higher-or-lower/higher-or-lower.component';


@NgModule({
  declarations: [
    HangmanComponent,
    HigherOrLowerComponent
  ],
  imports: [
    CommonModule,
    GamesRoutingModule
  ]
})
export class GamesModule { }
