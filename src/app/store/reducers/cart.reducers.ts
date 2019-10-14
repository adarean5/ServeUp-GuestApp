import {createReducer} from '@ngrx/store';
import {initialCartState} from '../states/cart.state';

export const cartReducers = createReducer(initialCartState);
