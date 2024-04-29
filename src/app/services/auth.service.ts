import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User, UserCredential, getAuth, updateProfile } from '@angular/fire/auth';
import { Injectable, signal } from '@angular/core';
import { UserInterface } from '../interfaces/user.interface';

// import { UserInterface } from '../interfaces/user.interface';
// import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private firebaseAuth: Auth,
    // private userService: UserService
  ) { }

  /* registerAuth(email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this.firebaseAuth, email, password)
  } */

  login({email, password}: UserInterface): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.firebaseAuth, email, password!)
  }

  logout(): Promise<void> {
    return signOut(this.firebaseAuth);
  }

  getCurrentUser(): User | null {
    const auth: Auth = getAuth();
    return auth.currentUser;
  }

  /*
  async setDisplayName(email: string) {
    const fsUser: UserInterface = await this.userService.getUserByEmail(email)
    await updateProfile(this.getCurrentUser()!, {
      displayName: fsUser.username
    })
  } */
}
