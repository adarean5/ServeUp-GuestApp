import { ActionReducerMap } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';

import { IAppState } from '../states/app.state';
import { authReducers } from './auth.reducers';
import {homeReducers} from './home.reducers';

export const appReducers: ActionReducerMap<IAppState, any> = {
  router: routerReducer,
  auth: authReducers,
  home: homeReducers
};
