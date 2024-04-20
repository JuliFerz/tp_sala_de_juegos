import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardHeaderComponent } from './components/card-header/card-header.component';



@NgModule({
  declarations: [
    CardHeaderComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    CardHeaderComponent,
  ]
})
export class SharedModule { }
