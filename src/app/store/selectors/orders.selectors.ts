import {createFeatureSelector, createSelector} from '@ngrx/store';
import {IOrdersState} from '../states/orders.state';

const selectOrdersState = createFeatureSelector<IOrdersState>('orders');

export const selectSubmittingOrder = createSelector(
  selectOrdersState,
  (state: IOrdersState) => state.submittingOrder
);
