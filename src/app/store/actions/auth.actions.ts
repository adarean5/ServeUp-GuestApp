import { Action } from '@ngrx/store';

import { User } from '../models/user.model';

export enum EAuthActions {
  GSignIn = '[Auth] Google Sign in',
  GSignInSuccess = '[Auth] Google Sign in success'
}

export class GSignIn implements Action {
  public readonly type = EAuthActions.GSignIn;
}

export class GSignInSuccess implements Action {
  public readonly type = EAuthActions.GSignInSuccess;
  constructor(public payload: User) {}
}

export type AuthActions = GSignIn | GSignInSuccess;
