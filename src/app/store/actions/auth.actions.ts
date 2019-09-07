import { Action } from '@ngrx/store';

import { User } from '../models/user.model';

export enum EAuthActions {
  GET_USER = '[Auth] Get user',
  AUTHENTICATED = '[Auth] User authenticated',
  NOT_AUTHENTICATED = '[Auth] User not authenticated',
  G_SIGN_IN = '[Auth] Google Sign in',
  G_SIGN_OUT = '[Auth] Google Sign out success',
  G_AUTH_ERR = '[AUTH] Google auth error'
}

export class GetUser implements Action {
  public readonly type = EAuthActions.GET_USER;
  constructor(public payload?: User) {}
}

export class Authenticated implements Action {
  public readonly type = EAuthActions.AUTHENTICATED;
  constructor(public payload: User) {}
}

export class NotAuthenticated implements Action {
  public readonly type = EAuthActions.NOT_AUTHENTICATED;
  constructor(public payload?: any) {}
}

export class GSignIn implements Action {
  public readonly type = EAuthActions.G_SIGN_IN;
  constructor(public payload?: any) {}
}

export class GSignOut implements Action {
  public readonly type = EAuthActions.G_SIGN_OUT;
  constructor(public payload?: any) {}
}

export class GAuthError implements Action {
  public readonly type = EAuthActions.G_AUTH_ERR;
  constructor(public payload: any) {}
}

export type AuthActions
  = GetUser
  | Authenticated
  | NotAuthenticated
  | GSignIn
  | GSignOut
  | GAuthError;

