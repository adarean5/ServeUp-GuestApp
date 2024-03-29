import {createFeatureSelector, createSelector} from '@ngrx/store';
import {ICartState} from '../states/cart.state';
import {Meal} from '../models/meal.model';

const selectCartState = createFeatureSelector<ICartState>('cart');

export const selectCurrentRestaurant = createSelector(
  selectCartState,
  (state: ICartState) => state.cartRestaurant
);

export const selectCartContent = createSelector(
  selectCartState,
  (state: ICartState) => state.cartContent
);

export const selectTotalPrice = createSelector(
  selectCartContent,
  (cartContent) => {
    return cartContent.length === 0 ? 0 : cartContent.map((meal: Meal) => meal.quantity * meal.price)
      .reduce((total: number, add: number) => total + add);
  }
);
