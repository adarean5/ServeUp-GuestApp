import {Injectable} from '@angular/core';
import {OrdersService} from '../../orders/services/orders.service';
import {Actions, createEffect, ofType, ROOT_EFFECTS_INIT} from '@ngrx/effects';
import * as HomeActions from '../actions/home.actions';
import {catchError, map, switchMap} from 'rxjs/operators';
import {Restaurant} from '../models/restaurant.model';
import {of} from 'rxjs';

@Injectable()
export class HomeEffects {
  constructor(
    private ordersService: OrdersService,
    private actions$: Actions
  ) {}

  init = createEffect(() => this.actions$.pipe(
    ofType(ROOT_EFFECTS_INIT),
    switchMap(() => {
      return this.ordersService.restaurantsHome().pipe(
        map((response: any[]) => {
          const restaurants: Restaurant[] =  response.map(apiRestaurant => {
            return Restaurant.fromApi(apiRestaurant);
          });
          console.log('[ROOT Home effect response] ', restaurants);
          return HomeActions.getRestaurantsSuccess({restaurants});
        }),
        catchError(err => {
          return of(HomeActions.getRestaurantsErr({err}));
        })
      );
    })
  ));

  getRestaurantsSuccess = createEffect(() => this.actions$.pipe(
    ofType(HomeActions.getRestaurantsErr),
    map(action => {
      console.log('[GetRestaurantsErr] ', action);
    })
  ), {dispatch: false});
}
