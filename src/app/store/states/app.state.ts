import { RouterReducerState } from '@ngrx/router-store';

import { IAuthState, initialAuthState} from './auth.state';
import {IHomeState, initialHomeState} from './home.state';

export interface IAppState {
  router?: RouterReducerState;
  auth: IAuthState;
  home: IHomeState;
}

export const initialAppState: IAppState = {
  auth: initialAuthState,
  home: initialHomeState
};

export function getInitialState(): IAppState {
  return initialAppState;
}
