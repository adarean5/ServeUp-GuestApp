import {Action, createReducer, on} from '@ngrx/store';
import {initialOrderState, IOrdersState} from '../states/orders.state';
import * as OrdersActions from '../actions/orders.actions';

const ordersReducer = createReducer(initialOrderState,
  on(OrdersActions.submitNewOrder, state => ({
    ...state,
    submittingOrder: true
  })),
  on(OrdersActions.submitNewOrderSuccess, state => ({
    ...state,
    submittingOrder: false
  })),
  on(OrdersActions.submitNewOrderErr, state => ({
    ...state,
    submittingOrder: false
  }))
);

export function ordersReducers(state: IOrdersState, action: Action) {
  return ordersReducer(state, action);
}
