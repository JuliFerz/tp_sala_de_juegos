import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User, UserCredential, getAuth } from '@angular/fire/auth';
import { collection, doc, Firestore, setDoc } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

import { UserInterface } from '../interfaces/user.interface';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public userCollection = collection(this.firestore, 'logins');

  constructor(
    private firebaseAuth: Auth,
    private firestore: Firestore
  ) { }

  register({ email, password }: UserInterface): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this.firebaseAuth, email, password!)
  }

  login({ email, password }: UserInterface): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.firebaseAuth, email, password!)
  }

  logout(): Promise<void> {
    return signOut(this.firebaseAuth);
  }

  getCurrentUser(): User | null {
    const auth: Auth = getAuth();
    return auth.currentUser;
  }

  saveLogin({ email }: User ) {
    setDoc(doc(this.userCollection), {
      user: email,
      date: new Date(),
    });
  }

  /*
  async setDisplayName(email: string) {
    const fsUser: UserInterface = await this.userService.getUserByEmail(email)
    await updateProfile(this.getCurrentUser()!, {
      displayName: fsUser.username
    })
  } */
}
