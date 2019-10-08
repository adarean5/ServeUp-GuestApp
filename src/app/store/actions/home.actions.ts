import {createAction, props} from '@ngrx/store';
import {Restaurant} from '../models/restaurant.model';
import {RestaurantType} from '../models/restaurant-type.model';

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

export const openSearchDialog = createAction(
  '[Home] Open search dialog'
);

export const closeSearchDialog = createAction(
  '[Home] Close search dialog'
);

export const getRestaurantTypes = createAction(
  '[Home] GetRestaurantTypes'
);

export const getRestaurantTypesSuccess = createAction(
  '[Home] Get restaurant types success',
  props<{restaurantTypes: RestaurantType[]}>()
);

export const getRestaurantTypesErr = createAction(
  '[Home] Get restaurant types err',
  props<{err: any}>()
);

export const searchRestaurants = createAction(
  '[Home] Search Restaurants',
  props<{
    location: string;
    restaurantType: string
  }>()
);

