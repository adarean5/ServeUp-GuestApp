import {Restaurant} from '../models/restaurant.model';
import {RestaurantType} from '../models/restaurant-type.model';

export interface IHomeState {
  // Home
  restaurants: Restaurant[];
  // Search
  restaurantTypes: RestaurantType[];
  searchDialogOpened: boolean;
  loadingRestaurants: boolean;
  restaurantsSearch: Restaurant[];
  loadingSearch: boolean;
  // Meals
  loadingMeals: boolean;
  meals: any;
}

export const initialHomeState: IHomeState = {
  // Home
  restaurants: undefined,
  // Search
  restaurantTypes: undefined,
  searchDialogOpened: false,
  loadingRestaurants: false,
  restaurantsSearch: [],
  loadingSearch: false,
  // Meals
  loadingMeals: false,
  meals: undefined
};
