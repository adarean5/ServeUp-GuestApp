import {Restaurant} from '../models/restaurant.model';

export interface IHomeState {
  restaurants: Restaurant[];
  loadingRestaurants: boolean;
}

export const initialHomeState: IHomeState = {
  restaurants: undefined,
  loadingRestaurants: false
};
