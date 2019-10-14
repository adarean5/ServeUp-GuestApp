import {Restaurant} from '../models/restaurant.model';
import {Meal} from '../models/meal.model';

export interface ICartState {
  cartRestaurant: Restaurant;
  cartContent: Meal[];
}

export const initialCartState: ICartState = {
  cartRestaurant: undefined,
  cartContent: []
};
