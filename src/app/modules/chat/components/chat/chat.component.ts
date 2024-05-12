import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { getAuth, User } from '@angular/fire/auth';
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
  public userLogged!: User;

  constructor(
    private fb: FormBuilder,
    private chatService: ChatService
  ) { }


  returnTimeString(timestamp: Timestamp): string {
    const date = this.convertToDate(timestamp)

    const hora = date.getHours();
    const minutos = date.getMinutes().toString().padStart(2, '0');
    return `${hora}:${minutos}`
  }

  private convertToDate(timestamp: Timestamp): Date {
    const milliseconds = timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000;
    return new Date(milliseconds);
  }

  ngOnInit(): void {
    getAuth().onAuthStateChanged(user => user ? this.userLogged = user : '');
    this.chatService.getChats()
      .subscribe({
        next: (res) => {
          this.chats = res as ChatInterface[];
        }
      });
  }

  onSendMessage(): void {
    const message = this.chatForm.value.message;
    if (!message) return;

    this.chatForm.setValue({ message: '' });

    this.chatService.saveMessage({
      email: this.userLogged.email!,
      username: this.userLogged.displayName!,
      message: message
    })
  }

}
