import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HangmanComponent } from './components/hangman/hangman.component';
import { HigherOrLowerComponent } from './components/higher-or-lower/higher-or-lower.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'hangman', component: HangmanComponent },
      { path: 'higher-or-lower', component: HigherOrLowerComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GamesRoutingModule { }
