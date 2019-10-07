import {Restaurant} from '../models/restaurant.model';
import {RestaurantType} from '../models/restaurant-type.model';

export interface IHomeState {
  restaurants: Restaurant[];
  restaurantTypes: RestaurantType[];
  loadingRestaurants: boolean;
  searchDialogOpened: boolean;
}

export const initialHomeState: IHomeState = {
  restaurants: undefined,
  restaurantTypes: undefined,
  loadingRestaurants: false,
  searchDialogOpened: false
};
