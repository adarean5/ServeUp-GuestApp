import {Injectable} from '@angular/core';

import {auth} from 'firebase/app';
import {AngularFireAuth} from '@angular/fire/auth';
import {Observable} from 'rxjs';
import {User} from '../../../store/models/user.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
    private http: HttpClient
  ) {}

  public getUserData(): Observable<User | null> {
    console.log('Service: Getting user data', this.afAuth.authState);
    return this.afAuth.authState;
  }

  async googleSignIn() {
    console.log('Google sign in triggered');
    const provider = new auth.GoogleAuthProvider();
    return this.afAuth.auth.signInWithRedirect(provider);
  }

  async signOut() {
    await this.afAuth.auth.signOut();
  }

  public serveUpRegister(uid: string) {
    const url = environment.baseUrlBackend + '/user/register/';

    const body = {
      id_uporabnik: uid
    };

    return this.http.post(url, body);
  }
}
