import * as CartActions from '../actions/cart.actions';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {concatMap, map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {IAppState} from '../states/app.state';
import {Store} from '@ngrx/store';
import {selectCartContent, selectCurrentRestaurant} from '../selectors/cart.selectors';
import {Meal} from '../models/meal.model';

@Injectable()
export class CartEffects {
  constructor(
    private actions$: Actions,
    private store$: Store<IAppState>
  ) {}

  attemptAddToCart = createEffect(() => this.actions$.pipe(
    ofType(CartActions.attemptAddToCart),
    withLatestFrom(
      this.store$.select(selectCurrentRestaurant),
      this.store$.select(selectCartContent)
    ),
    map(([action, currentRestaurant, cartContent]) => {
      console.log('[Attempt add to cart]', action, currentRestaurant);
      // If cart is empty or if meal belongs to restaurant in the cart => add meal to cart
      if (currentRestaurant === undefined || currentRestaurant.id === action.restaurant.id) {
        console.log('Success adding to cart');
        const newCartContent = {...cartContent};
        // If item exists in cart => update quantity
        if (newCartContent[action.meal.id]) {
          newCartContent[action.meal.id] = Meal.withQuantity(
            action.meal,
            action.meal.quantity + newCartContent[action.meal.id].quantity
          );
        } else {
          // Else add a new meal to cart
          newCartContent[action.meal.id] = action.meal;
        }
        return CartActions.addToCart({cartContent: newCartContent, restaurant: action.restaurant});
      } else {
        // Else prompt user to decide if old cart should be kept, or erased in favour of new restaurant
        console.log('Prompt user');
        return CartActions.promptRestaurantChange({
          meal: action.meal,
          currentRestaurant,
          newRestaurant: action.restaurant
        });
      }
    })
  ));

  //addToCart = createEffect()
}
