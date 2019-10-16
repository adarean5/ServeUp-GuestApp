import {createAction, props} from '@ngrx/store';
import {Meal} from '../models/meal.model';
import {Restaurant} from '../models/restaurant.model';

// Check if restaurant matches the restaurant currently in the cart
export const attemptAddToCart = createAction(
  '[Cart] Attempt add to cart',
  props<{meal: Meal, restaurant: Restaurant}>()
);

export const addToCart = createAction(
  '[Cart] Add to cart',
  props<{cartContent: {[mealId: number]: Meal}, restaurant: Restaurant}>()
);

// If user selects a different restaurant await for confirmation to clear cart or cancel add
export const promptRestaurantChange = createAction(
'[Cart] Prompt restaurant change',
  props<{meal: Meal, currentRestaurant: Restaurant, newRestaurant: Restaurant}>()
);

export const updateQuantity = createAction(
  '[Cart] Update quantity',
  props<{meal: Meal, restaurant: Restaurant}>()
);

/*export const updateQuantitySuccess = createAction(
  '[Cart] Update quantity success',
  props<{meal: Meal}>()
);*/
