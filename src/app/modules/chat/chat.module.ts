import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './components/chat/chat.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ChatComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class ChatModule { }
