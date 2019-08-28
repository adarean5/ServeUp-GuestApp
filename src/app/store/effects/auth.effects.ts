import { Injectable } from '@angular/core';
import { Effect, ofType, Actions} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {switchMap, map, withLatestFrom, catchError} from 'rxjs/operators';

import {IAppState} from '../states/app.state';
import {
  EAuthActions,
  GetUser,
  Authenticated,
  NotAuthenticated,
  GSignIn,
  GSignOut,
  GAuthError
} from '../actions/auth.actions';
import { AuthService } from '../../auth/services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../models/user.model';

@Injectable()
export class AuthEffects {
  @Effect()
  getUser: Observable<Action> = this.actions$.pipe(
    // Check if action type Equals GET_USER
    ofType<GetUser>(EAuthActions.GET_USER),
    // Extract payload
    map((action: GetUser) => action.payload),
    switchMap(payload => this.afAuth.authState),
    map(authData => {
      if (authData) {
        const user: User = {
          uid: authData.uid,
          email: authData.email,
          photoURL: authData.photoURL,
          displayName: authData.displayName
        };
        return new Authenticated(user);
      } else {
        return  new NotAuthenticated(null);
      }
    }),
    catchError((err => {
       return of(new GAuthError(err));
    }))
  );

  constructor(
    private authService: AuthService,
    private actions$: Actions,
    private store: Store<IAppState>,
    private afAuth: AngularFireAuth
  ) {}
}
