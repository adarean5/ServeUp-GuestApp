import {Order} from '../models/order.model';

export interface IOrdersState {
  allOrders: Order[];
  submittingOrder: boolean;
  gettingOrders: boolean;
}

export const initialOrderState: IOrdersState = {
  allOrders: undefined,
  submittingOrder: false,
  gettingOrders: false
};
