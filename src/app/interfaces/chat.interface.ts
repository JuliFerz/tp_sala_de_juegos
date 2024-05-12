import { Timestamp } from "@angular/fire/firestore";

export interface ChatInterface {
  email: string;
  username: string;
  message: string;
  date: string;
  id?: number;
}