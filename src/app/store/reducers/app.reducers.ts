import {ActionReducerMap} from '@ngrx/store';
import {routerReducer} from '@ngrx/router-store';

import {IAppState} from '../states/app.state';
import {authReducers} from './auth.reducers';

export const appReducers: ActionReducerMap<IAppState, any> = {
  router: routerReducer,
  auth: authReducers,
};
