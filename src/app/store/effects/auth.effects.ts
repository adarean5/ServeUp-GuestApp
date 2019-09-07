import {Injectable} from '@angular/core';
import {Actions, Effect, ofType, ROOT_EFFECTS_INIT} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, exhaustMap, map, switchMap, tap} from 'rxjs/operators';
import {fromPromise} from 'rxjs/internal-compatibility';

import {Authenticated, EAuthActions, GAuthError, GetUser, GSignIn, GSignOut, NotAuthenticated} from '../actions/auth.actions';
import {AuthService} from '../../auth/services/auth.service';
import {User} from '../models/user.model';

@Injectable()
export class AuthEffects {
  constructor(
    private authService: AuthService,
    private actions$: Actions,
  ) {}

  @Effect()
  init = this.actions$.pipe(
    ofType(ROOT_EFFECTS_INIT),
    tap(() => {console.log('[ROOT_EFFECTS_INIT] Started'); }),
    map(() => new GetUser())
  );

  @Effect()
  getUser: Observable<Authenticated | NotAuthenticated | GAuthError> = this.actions$.pipe(
    // Check if action type is GET_USER
    ofType<GetUser>(EAuthActions.GET_USER),
    tap(() => {console.log('[GetUser] Started'); }),
    // Extract payload
    map((action: GetUser) => action.payload),
    /* Call authService to get the currently authenticated user.
    exhaustMap makes sure the current authService.getUserData() call completes
    before accepting new requests. */
    exhaustMap(() => {
      return this.authService.getUserData();
    }),
    /* If user data was received,
    create a new user object and trigger a new Authenticated action
    else trigger a new NotAuthenticated action. */
    map(userData => {
      if (userData) {
        console.log('[GetUser] AuthData received:', userData);
        const user: User = {
          uid: userData.uid,
          email: userData.email,
          photoURL: userData.photoURL,
          displayName: userData.displayName
        };
        console.log('[GetUser] User:', user);
        return new Authenticated(user);
      } else {
        console.log('[GetUser] AuthData not received');
        return  new NotAuthenticated(null);
      }
    }),
    catchError((err => {
      console.log('Get user: Auth error:', err);
      return of(new GAuthError(err));
    }))
  );

  @Effect()
  gSignIn: Observable<GetUser | GAuthError> = this.actions$.pipe(
    ofType<GSignIn>(EAuthActions.G_SIGN_IN),
    tap(() => {console.log('[GSignIn] Started'); }),
    map((action: GSignIn) => action.payload),
    switchMap(() => {
      return fromPromise(this.authService.googleSignIn());
    }),
    map( () => {
      return new GetUser();
    }),
    catchError(err => {
      return of(new GAuthError({error: err.message}));
    })
  );

  @Effect()
  gSignOut: Observable<NotAuthenticated | GAuthError> = this.actions$.pipe(
    ofType<GSignOut>(EAuthActions.G_SIGN_OUT),
    tap(() => {console.log('[GSignOut] Started'); }),
    map((action: GSignOut) => action.payload),
    exhaustMap(() => {
      return of(this.authService.signOut());
    }),
    map( () => {
      return new NotAuthenticated();
    }),
    catchError(err => of(new GAuthError({error: err.message})))
  );

  @Effect({dispatch: false})
  notAuthenticated = this.actions$.pipe(
   ofType<NotAuthenticated>(EAuthActions.NOT_AUTHENTICATED),
   tap(() => {console.log('[NotAuthenticated] Started'); }),
   map((action: NotAuthenticated) => action.payload),
  );

  @Effect({dispatch: false})
  authenticated = this.actions$.pipe(
    ofType<Authenticated>(EAuthActions.AUTHENTICATED),
    tap(() => {console.log('[Authenticated] Started'); }),
    map((action: Authenticated) => action.payload),
  );
}
