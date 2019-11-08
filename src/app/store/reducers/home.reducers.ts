import {Action, createReducer, on} from '@ngrx/store';
import {IHomeState, initialHomeState} from '../states/home.state';
import * as HomeActions from '../actions/home.actions';

const homeReducer = createReducer(initialHomeState,
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
  on(HomeActions.searchRestaurants, state => ({
    ...state,
    loadingSearch: true,
    restaurantsSearch: [],
  })),
  on(HomeActions.searchRestaurantsSuccess, (state, {restaurantsSearch}) => ({
    ...state,
    loadingSearch: false,
    restaurantsSearch
  })),
  on(HomeActions.searchRestaurantsErr, state => ({
    ...state,
    loadingSearch: false
  })),
  // Meals
  on(HomeActions.getMealsForRestaurant, state => ({
    ...state,
    loadingMeals: true
  })),
  on(HomeActions.getMealsForRestaurantSuccess, (state, {meals}) => ({
    ...state,
    meals,
    loadingMeals: false
  })),
  on(HomeActions.getMealsForRestaurantErr, (state, {err}) => ({
    ...state,
    loadingMeals: false
  }))
);

export function homeReducers(state: IHomeState, action: Action) {
  return homeReducer(state, action);
}
