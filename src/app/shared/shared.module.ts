import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardHeaderComponent } from './components/card-header/card-header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    CardHeaderComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    CardHeaderComponent,
    SidebarComponent,
  ]
})
export class SharedModule { }
