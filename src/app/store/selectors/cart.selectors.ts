import {IAppState} from '../states/app.state';
import {createSelector} from '@ngrx/store';
import {ICartState} from '../states/cart.state';
import {Meal} from '../models/meal.model';

const selectCartState = (state: IAppState) => state.cart;

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
    return cartContent.map((meal: Meal) => meal.quantity * meal.price)
      .reduce((total: number, add: number) => total + add);
  }
);
