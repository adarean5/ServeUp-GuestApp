import * as CartActions from '../actions/cart.actions';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {concatMap, map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {IAppState} from '../states/app.state';
import {Store} from '@ngrx/store';
import {selectCurrentRestaurant} from '../selectors/cart.selectors';

@Injectable()
export class CartEffects {
  constructor(
    private actions$: Actions,
    private store$: Store<IAppState>
  ) {}

  attemptAddToCart = createEffect(() => this.actions$.pipe(
    ofType(CartActions.attemptAddToCart),
    tap(() => {
      console.log('Start');
    }),
    withLatestFrom(this.store$.select(selectCurrentRestaurant)),
    tap(() => {
      console.log('Latest from');
    }),
    map(([action, currentRestaurant]) => {
      console.log('[Attempt add to cart]', action, currentRestaurant);
      // If cart is empty or if meal belongs to restaurant in the cart => add meal to cart
      if (currentRestaurant === undefined || currentRestaurant.id === action.restaurant.id) {
        console.log('Success adding to cart');
        return CartActions.addToCart({meal: action.meal, restaurant: action.restaurant});
      } else {
        console.log('Prompt user');
        return CartActions.promptRestaurantChange({
          meal: action.meal,
          currentRestaurant,
          newRestaurant: action.restaurant
        });
      }
    })
  ));
}
