import {createReducer, on} from '@ngrx/store';
import {initialCartState} from '../states/cart.state';
import * as CartActions from '../actions/cart.actions';

export const cartReducers = createReducer(
  initialCartState,
  on(CartActions.addToCart, (state, {cartContent, restaurant}) => ({
    ...state,
    cartContent,
    cartRestaurant: restaurant
  }))
);
