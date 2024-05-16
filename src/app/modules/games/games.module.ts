import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GamesRoutingModule } from './games-routing.module';
import { HangmanComponent } from './components/hangman/hangman.component';
import { HigherOrLowerComponent } from './components/higher-or-lower/higher-or-lower.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    HangmanComponent,
    HigherOrLowerComponent
  ],
  imports: [
    CommonModule,
    GamesRoutingModule,
    SharedModule,
  ]
})
export class GamesModule { }
