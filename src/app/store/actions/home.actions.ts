import {createAction, props} from '@ngrx/store';
import {Restaurant} from '../models/restaurant.model';
import {RestaurantType} from '../models/restaurant-type.model';

// Get restaurants
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


// Search dialog
export const openSearchDialog = createAction(
  '[Home] Open search dialog'
);

export const closeSearchDialog = createAction(
  '[Home] Close search dialog'
);

// Get restaurant types
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

// Search restaurants
export const searchRestaurants = createAction(
  '[Home] Search Restaurants',
  props<{
    location: string;
    restaurantType: string
  }>()
);

export const searchRestaurantsSuccess = createAction(
  '[Home] Search restaurants success',
  props<{
    restaurantsSearch: Restaurant[]
  }>()
);

export const searchRestaurantsErr = createAction(
  '[Home] Search restaurants err',
  props<{err: any}>()
);

