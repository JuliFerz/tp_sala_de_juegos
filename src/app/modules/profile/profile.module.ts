import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ProfileComponent } from './components/profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule,
  ]
})
export class ProfileModule { }
