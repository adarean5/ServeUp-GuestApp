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
  })),
  on(OrdersActions.getOrders, state => ({
    ...state,
    gettingOrders: true
  })),
  on(OrdersActions.getOrdersSuccess, (state, {orders}) => ({
    ...state,
    allOrders: orders,
    gettingOrders: false
  })),
  on(OrdersActions.getOrdersErr, state => ({
    ...state,
    gettingOrders: false
  })),
  on(OrdersActions.checkIn, state => ({
    ...state,
    checkingIn: true
  })),
  on(OrdersActions.checkInSuccess, state => ({
    ...state,
    checkingIn: false
  })),
  on(OrdersActions.checkInErr, state => ({
    ...state,
    checkingIn: false
  })),
);

export function ordersReducers(state: IOrdersState, action: Action) {
  return ordersReducer(state, action);
}
