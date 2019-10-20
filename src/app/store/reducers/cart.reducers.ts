import {createReducer, on} from '@ngrx/store';
import {initialCartState} from '../states/cart.state';
import * as CartActions from '../actions/cart.actions';
import {Meal} from '../models/meal.model';

export const cartReducers = createReducer(
  initialCartState,
  on(CartActions.addToCart, (state, {cartContent, restaurant}) => ({
    ...state,
    cartContent,
    cartRestaurant: restaurant
  })),
  on(CartActions.removeItem, (state, {mealId}) => ({
    ...state,
    cartContent: state.cartContent.filter((meal: Meal) => meal.id !== mealId),
    cartRestaurant: state.cartContent.length === 1 ? undefined : state.cartRestaurant
  })),
  on(CartActions.updateQuantity, (state, {mealId, quantity}) => ({
    ...state,
    cartContent: state.cartContent.map((meal: Meal) => {
      if (meal.id === mealId) {
        return Meal.withQuantity(meal, quantity);
      } else {
        return meal;
      }
    })
  }))
);
