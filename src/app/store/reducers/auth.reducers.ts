import * as AuthActions from '../actions/auth.actions';
import {IAuthState, initialAuthState} from '../states/auth.state';
import {Action, createReducer, on} from '@ngrx/store';

const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.getUser, state => ({
    ...state,
    loading: true
  })),
  on(AuthActions.authenticated, (state, {user}) => ({
    ...state,
    user,
    signedIn: true,
    loading: false
  })),
  on(AuthActions.notAuthenticated, state => ({
    ...state,
    user: null,
    signedIn: false,
    loading: false
  })),
  on(AuthActions.gSignIn, state => ({
    ...state,
    user: null,
    loading: true
  })),
  on(AuthActions.bRegisterSuccess, state => ({
    ...state,
    registered: true,
    loading: false
  })),
  on(AuthActions.bRegisterErr, state => ({
    ...state,
    user: null,
    signedIn: false,
    registered: false,
    loading: false
  })),
  on(AuthActions.gAuthError, state => ({
    ...state,
    user: null,
    signedIn: false,
    registered: false,
    loading: false
  }))
);

export function authReducers(state: IAuthState | undefined, action: Action) {
  return authReducer(state, action);
}
