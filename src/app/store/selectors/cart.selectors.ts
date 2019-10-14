import {IAppState} from '../states/app.state';
import {createSelector} from '@ngrx/store';
import {ICartState} from '../states/cart.state';

const selectCartState = (state: IAppState) => state.cart;

export const selectCurrentRestaurant = createSelector(
  selectCartState,
  (state: ICartState) => state.currentRestaurant
);

export const selectCartContent = createSelector(
  selectCartState,
  (state: ICartState) => state.cartContent
);
