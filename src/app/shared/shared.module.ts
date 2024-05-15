import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CardHeaderComponent } from './components/card-header/card-header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SpinnerComponent } from './components/spinner/spinner.component';


@NgModule({
  declarations: [
    CardHeaderComponent,
    SidebarComponent,
    SpinnerComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    CardHeaderComponent,
    SidebarComponent,
    SpinnerComponent,
  ]
})
export class SharedModule { }
