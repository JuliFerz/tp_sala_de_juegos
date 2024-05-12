import { collection, collectionData, doc, DocumentData, Firestore, limit, orderBy, query, setDoc } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ChatInterface } from '../interfaces/chat.interface';


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private chatCollection = collection(this.firestore, 'chats');

  constructor(private firestore: Firestore) { }


  getChats(): Observable<DocumentData> {
    const filteredQuery = query(
      this.chatCollection,
      orderBy('id', 'asc'),
    );

    return collectionData(filteredQuery);
  }

  getLastChatId(): Observable<DocumentData> {
    const filteredQuery = query(
      this.chatCollection,
      orderBy('id', 'desc'),
      limit(1)
    );

    return collectionData(filteredQuery);
  }

  saveMessage(chat: ChatInterface) {
    setDoc(doc(this.chatCollection), {
      email: chat.email,
      username: chat.username,
      message: chat.message,
      date: chat.date,
      id: chat.id
    });
  }
}
