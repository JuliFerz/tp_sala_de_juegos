import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { getAuth, User, provideAuth } from '@angular/fire/auth';
import { Timestamp } from '@angular/fire/firestore';

import { ChatInterface } from '../../../../interfaces/chat.interface';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
  public chats: ChatInterface[] = [];
  public chatForm: FormGroup = this.fb.group(
    { message: ['', []] }
  );
  public lastChatId!: number;
  public userLogged!: User;

  constructor(
    private fb: FormBuilder,
    private chatService: ChatService
  ) { }


  returnTimeString(dateString: string): string {
    const date = new Date(dateString);

    const hour = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.getMonth().toString().padStart(2, '0');
    return `${day}/${month} (${hour}:${minutes})`;
  }

  onSendMessage(): void {
    const message = this.chatForm.value.message;
    if (!message) return;

    this.chatForm.setValue({ message: '' });

    this.chatService.saveMessage({
      email: this.userLogged.email!,
      username: this.userLogged.displayName!,
      message: message,
      date: new Date().toLocaleString("en-US", { timeZone: "America/Argentina/Buenos_Aires" }),
      id: this.lastChatId
    })
  }

  ngOnInit(): void {
    getAuth().onAuthStateChanged(user => user ? this.userLogged = user : '');
    this.chatService.getChats()
      .subscribe({
        next: (res) => {
          this.chats = res as ChatInterface[];
        }
      });

    this.chatService.getLastChatId()
      .subscribe({
        next: (chat) => {
          if (!chat[0]) {
            this.lastChatId = 1;
          } else {
            this.lastChatId = chat[0].id + 1
          }
        }
      });
  }

}
