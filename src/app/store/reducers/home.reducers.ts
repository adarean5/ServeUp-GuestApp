import {createReducer, on} from '@ngrx/store';
import {initialHomeState} from '../states/home.state';
import * as HomeActions from '../actions/home.actions';

export const homeReducers = createReducer(
  initialHomeState,
  // Get restaurants
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
  })),
  // Search dialog
  on(HomeActions.openSearchDialog, state => ({
    ...state,
    searchDialogOpened: true
  })),
  on(HomeActions.closeSearchDialog, state => ({
    ...state,
    searchDialogOpened: false
  })),
  // Get restaurant types
  on(HomeActions.getRestaurantTypesSuccess, (state, {restaurantTypes}) => ({
    ...state,
    restaurantTypes
  })),
  // Restaurant search
  on(HomeActions.searchRestaurants, (state => ({
    ...state,
    loadingRestaurants: true
  }))),
  on(HomeActions.searchRestaurantsSuccess, ((state, {restaurantsSearch}) => ({
    ...state,
    loadingRestaurants: false,
    restaurantsSearch
  }))),
  on(HomeActions.searchRestaurantsErr, state => ({
    ...state,
    loadingRestaurants: false
  }))
);
