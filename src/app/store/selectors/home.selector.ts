import {createFeatureSelector, createSelector} from '@ngrx/store';
import {IHomeState} from '../states/home.state';

const selectHomeState = createFeatureSelector<IHomeState>('home');

export const selectRestaurants = createSelector(
  selectHomeState,
  (state: IHomeState) => state.restaurants
);

export const selectLoadingRestaurants = createSelector(
  selectHomeState,
  (state: IHomeState) => state.loadingRestaurants
);

export const selectSearchDialogOpened = createSelector(
  selectHomeState,
  (state: IHomeState) => state.searchDialogOpened
);

export const selectRestaurantTypes = createSelector(
  selectHomeState,
  (state: IHomeState) => state.restaurantTypes
);

export const selectRestaurantsSearch = createSelector(
  selectHomeState,
  (state: IHomeState) => state.restaurantsSearch
);

export const selectLoadingSearch = createSelector(
  selectHomeState,
  (state: IHomeState) => state.loadingSearch
);

export const selectMeals = createSelector(
  selectHomeState,
  (state: IHomeState) => state.meals
);

export const selectLoadingMeals = createSelector(
  selectHomeState,
  (state: IHomeState) => state.loadingMeals
);
