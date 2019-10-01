import {createReducer, on} from '@ngrx/store';
import {initialHomeState} from '../states/home.state';
import * as HomeActions from '../actions/home.actions';

export const homeReducers = createReducer(
  initialHomeState,
  on(HomeActions.getRestaurants, state => ({
    ...state,
    loadingRestaurants: true
  })),
  on(HomeActions.getRestaurantsSuccess, (state, {restaurants}) => ({
    ...state,
    restaurants,
    loadingRestaurants: false,
  })),
  on(HomeActions.getRestaurantsErr, state => ({
    ...state,
    restaurants: null,
    loadingRestaurants: false
  }))
);
