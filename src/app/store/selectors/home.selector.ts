import { IAppState } from '../states/app.state';
import {createSelector} from '@ngrx/store';
import {IHomeState} from '../states/home.state';

const selectHomeState = (state: IAppState) => state.home;

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
