import {createAction, props} from '@ngrx/store';
import {Order} from '../models/order.model';

export const submitNewOrder = createAction(
  '[Orders] Submit new order'
);

export const submitNewOrderSuccess = createAction(
  '[Orders] Submit new order success'
);

export const submitNewOrderErr = createAction(
  '[Orders] Submit new order error',
  props<{err: any}>()
);

export const getOrders = createAction(
  '[Orders] Get all orders'
);

export const getOrdersSuccess = createAction(
  '[Orders] Get all orders success',
  props<{orders: Order}>()
);

export const getOrdersErr = createAction(
  '[Orders] Get all orders error',
  props<{err: any}>()
);
