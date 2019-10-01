import {createAction, props} from '@ngrx/store';
import {Restaurant} from '../models/restaurant.model';

export const getRestaurants = createAction(
  '[Home] Get restaurants'
);

export const getRestaurantsSuccess = createAction(
  '[Home] Get restaurants success',
  props<{restaurants: Restaurant[]}>()
);

export const getRestaurantsErr = createAction(
  '[Home] Get restaurants err',
  props<{err: any}>()
);

