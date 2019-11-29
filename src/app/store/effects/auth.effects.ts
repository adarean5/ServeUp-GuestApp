import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, exhaustMap, map, tap} from 'rxjs/operators';
import {fromPromise} from 'rxjs/internal-compatibility';

import * as AuthActions from '../actions/auth.actions';
import {AuthService} from '../../shared/services/auth/auth.service';
import {User} from '../models/user.model';
import {Action} from '@ngrx/store';

@Injectable()
export class AuthEffects {
  constructor(
    private authService: AuthService,
    private actions$: Actions,
  ) {}

  getUser = createEffect(() => this.actions$.pipe(
    // Check if action type matches getUser type
    ofType(AuthActions.getUser),
    /* Call authService to get the currently authenticated user.
    exhaustMap makes sure the current authService.getUserData() call completes
    before accepting new requests. */
    exhaustMap(() => {
      return this.authService.getUserData().pipe(
        /* If user data was received,
        create a new user object and trigger a new Authenticated action
        else trigger a new NotAuthenticated action. */
        map(userData => {
          if (userData) {
            const user: User = {
              uid: userData.uid,
              email: userData.email,
              photoURL: userData.photoURL,
              displayName: userData.displayName
            };
            return AuthActions.authenticated({user});
          } else {
            return  AuthActions.notAuthenticated();
          }
        }),
        catchError(err => of(AuthActions.gAuthError(err)))
      );
    }),
  ));

  gSignIn = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.gSignIn),
    exhaustMap(() => {
      return fromPromise(this.authService.googleSignIn()).pipe(
        map( () => {
          return AuthActions.getUser();
        }),
        catchError(err => of(AuthActions.gAuthError(err)))
      );
    })
  ));

  gSignOut = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.gSignOut),
    exhaustMap(() => {
      return of(this.authService.signOut()).pipe(
        map( () => {
          return AuthActions.notAuthenticated();
        }),
        catchError(err => of(AuthActions.gAuthError(err)))
      );
    }),
  ));

  gAuthError = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.gAuthError),
    tap(action => {
      console.log('[GAuthErr] ', action);
    }),
  ), {dispatch: false});

  authenticated = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.authenticated),
    map((action) => AuthActions.bRegister({uid: action.user.uid})),
  ));

  bRegister = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.bRegister),
    exhaustMap((action) => {
      return this.authService.serveUpRegister(action.uid).pipe(
        map(response => {
          return AuthActions.bRegisterSuccess();
        })
      );
    })
  ));

  getUserFromFire(): Observable<Action> {
    return this.authService.getUserData().pipe(
      /* If user data was received,
      create a new user object and trigger a new Authenticated action
      else trigger a new NotAuthenticated action. */
      map(userData => {
        if (userData) {
          const user: User = {
            uid: userData.uid,
            email: userData.email,
            photoURL: userData.photoURL,
            displayName: userData.displayName
          };
          return AuthActions.authenticated({user});
        } else {
          return  AuthActions.notAuthenticated();
        }
      }),
      catchError(err => of(AuthActions.gAuthError(err)))
    );
  }
}
