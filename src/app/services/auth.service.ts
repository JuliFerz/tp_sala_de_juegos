import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User, getAuth, updateProfile } from '@angular/fire/auth';
import { collection, doc, Firestore, setDoc } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { onAuthStateChanged } from '@firebase/auth';

import { UserInterface } from '../interfaces/user.interface';
import { from, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public userCollection = collection(this.firestore, 'logins');

  constructor(
    private firebaseAuth: Auth,
    private firestore: Firestore
  ) { }

  register({ email, password, username }: UserInterface): Observable<void> {
    const promise = createUserWithEmailAndPassword(this.firebaseAuth, email, password!)
      .then(res => updateProfile(res.user, { displayName: username }))

    return from(promise);
  }

  login({ email, password }: UserInterface): Observable<void> {
    const promise = signInWithEmailAndPassword(this.firebaseAuth, email, password!)
      .then(() => { });
    this.saveLogin(email);
    return from(promise);
  }

  logout(): Promise<void> {
    return signOut(this.firebaseAuth);
  }

  getCurrentUser(): User | null {
    const auth: Auth = getAuth();
    return auth.currentUser;
  }

  getCurrentUserApp(): void {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {});
  }

  private saveLogin(email: string) {
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
