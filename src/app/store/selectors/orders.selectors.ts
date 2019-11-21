import {createFeatureSelector, createSelector} from '@ngrx/store';
import {IOrdersState} from '../states/orders.state';

const selectOrdersState = createFeatureSelector<IOrdersState>('orders');

export const selectSubmittingOrder = createSelector(
  selectOrdersState,
  (state: IOrdersState) => state.submittingOrder
);

export const selectAllOrders = createSelector(
  selectOrdersState,
  (state: IOrdersState) => state.allOrders
);

export const selectGettingOrders = createSelector(
  selectOrdersState,
  (state: IOrdersState) => state.gettingOrders
);

export const selectCheckingIn = createSelector(
  selectOrdersState,
  (state: IOrdersState) => state.checkingIn
);


