import {createAction, props} from '@ngrx/store';
import {Meal} from '../models/meal.model';

export const attemptAddToCart = createAction(
  '[Cart] Attempt add to cart',
  props<{meal: Meal, restaurantId: number}>()
);

export const addToCart = createAction(
  '[Cart] Add to cart',
  props<{meal: Meal}>()
);
