import { createSelector } from '@ngrx/store';

import { IAppState } from '../states/app.state';
import { IAuthState } from '../states/auth.state';

const selectAuthState = (state: IAppState) => state.auth;

export const selectUser = createSelector(
  selectAuthState,
  (state: IAuthState) => state.user
);

export const selectSignedIn = createSelector(
  selectAuthState,
  (state: IAuthState) => state.signedIn
);

export const selectLoading = createSelector(
  selectAuthState,
  (state: IAuthState) => state.loading
);
