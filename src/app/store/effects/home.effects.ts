import {Injectable} from '@angular/core';
import {OrdersService} from '../../main/services/orders.service';
import {Actions, createEffect, ofType, OnInitEffects} from '@ngrx/effects';
import * as HomeActions from '../actions/home.actions';
import {catchError, map, switchMap} from 'rxjs/operators';
import {Restaurant} from '../models/restaurant.model';
import {of} from 'rxjs';
import {RestaurantType} from '../models/restaurant-type.model';
import {Router} from '@angular/router';
import {Meal} from '../models/meal.model';
import {Action, createAction} from '@ngrx/store';

@Injectable()
export class HomeEffects implements OnInitEffects {
  constructor(
    private ordersService: OrdersService,
    private actions$: Actions,
    private router: Router
  ) {}

  homeEffectsInit = createAction(
    '[HomeEffects] Init'
  );

  init = createEffect(() => this.actions$.pipe(
    ofType(this.homeEffectsInit),
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

  getRestaurantTypes = createEffect(() => this.actions$.pipe(
    ofType(HomeActions.getRestaurantTypes),
    switchMap(() => {
      return this.ordersService.getRestaurantTypes().pipe(
        map((response: []) => {
          const restaurantTypes = response.map(apiType => RestaurantType.fromApi(apiType));
          console.log('Response:', restaurantTypes);
          return HomeActions.getRestaurantTypesSuccess({restaurantTypes});
        }),
        catchError((err: any) => of(HomeActions.getRestaurantsErr({err})))
      );
    }),
  ));

  searchRestaurants = createEffect(() => this.actions$.pipe(
    ofType(HomeActions.searchRestaurants),
    switchMap(action => {
      this.router.navigate(['main/search-results']);
      const restaurantType = action.restaurantType;
      return this.ordersService.searchRestaurants(action.location).pipe(
        map((result: any[]) => {
          console.log('[SearchRestaurants] Api result before filter', result);
          result = restaurantType
            ? result.filter(responseRestaurant => responseRestaurant.tip === restaurantType)
            : result;
          const restaurantsSearch = result.map(responseRestaurant => Restaurant.fromApi(responseRestaurant));
          console.log('[SearchRestaurants] Api result after filter', restaurantsSearch);
          return HomeActions.searchRestaurantsSuccess({restaurantsSearch});
        }),
        catchError(err => of(HomeActions.searchRestaurantsErr({err})))
      );
    })
  ));

  getMealsForRestaurant = createEffect(() => this.actions$.pipe(
    ofType(HomeActions.getMealsForRestaurant),
    switchMap(action => {
      return this.ordersService.getMealsForRestaurant(action.restaurantId).pipe(
        map((meals: any) => {
          Object.keys(meals).forEach(key => {
            meals[key] = meals[key].map(apiMeal => Meal.fromApi(apiMeal));
          });
          console.log('Final meals', meals);
          return HomeActions.getMealsForRestaurantSuccess({meals});
        }),
        catchError(err => of(HomeActions.getMealsForRestaurantErr({err})))
      );
    })
  ));

  ngrxOnInitEffects(): Action {
    return this.homeEffectsInit();
  }
}
