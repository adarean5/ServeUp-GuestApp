import {createAction, props} from '@ngrx/store';

export const submitNewOrder = createAction(
  '[Orders] Submit new order'
);

export const submitNewOrderSuccess = createAction(
  '[Orders] Submit new order success'
);

export const submitNewOrderErr = createAction(
  '[Orders] Submit new order error',
  props<{error: any}>()
);
