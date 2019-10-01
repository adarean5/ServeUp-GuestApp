import {createAction, props} from '@ngrx/store';

import { User } from '../models/user.model';

export const getUser = createAction(
  '[Auth] Get user'
);

export const authenticated = createAction(
  '[Auth] User authenticated',
  props<{user: User}> ()
);

export const notAuthenticated = createAction(
  '[Auth] User not authenticated'
);

export const gSignIn = createAction(
  '[Auth] Google Sign in'
);

export const gSignOut = createAction(
  '[Auth] Google Sign out success'
);

export const gAuthError = createAction(
  '[Auth] Google auth error',
  props<{err: any}>()
);

export const bRegister = createAction(
  '[Auth] Backend register',
  props<{uid: string}>()
);

export const bRegisterSuccess = createAction(
  '[Auth] Backend register success'
);

export const bRegisterErr = createAction(
  '[Auth] Backend register error'
);
