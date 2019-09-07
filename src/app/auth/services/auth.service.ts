import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
  ) {
    console.log('Starting auth service');
  }

  public getUserData(): Observable<User | null> {
    console.log('Service: Getting user data', this.afAuth.authState);
    return this.afAuth.authState;
  }

  async googleSignIn() {
    const provider = new auth.GoogleAuthProvider();
    return this.afAuth.auth.signInWithPopup(provider);
  }

  async signOut() {
    await this.afAuth.auth.signOut();
  }
}
