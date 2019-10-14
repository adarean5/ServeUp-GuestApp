import { RouterReducerState } from '@ngrx/router-store';

import { IAuthState, initialAuthState} from './auth.state';
import {IHomeState, initialHomeState} from './home.state';
import {ICartState, initialCartState} from './cart.state';

export interface IAppState {
  router?: RouterReducerState;
  auth: IAuthState;
  home: IHomeState;
  cart: ICartState;
}

export const initialAppState: IAppState = {
  auth: initialAuthState,
  home: initialHomeState,
  cart: initialCartState
};

export function getInitialState(): IAppState {
  return initialAppState;
}
