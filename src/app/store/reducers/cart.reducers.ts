import {createReducer, on} from '@ngrx/store';
import {initialCartState} from '../states/cart.state';
import * as CartActions from '../actions/cart.actions';

export const cartReducers = createReducer(
  initialCartState,
  on(CartActions.addToCart, (state, {meal, restaurant}) => ({
    ...state,
    cartContent: [...state.cartContent, meal],
    cartRestaurant: restaurant
  }))
);
