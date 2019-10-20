import * as CartActions from '../actions/cart.actions';
import {act, Actions, createEffect, ofType, ROOT_EFFECTS_INIT} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {catchError, concatMap, map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {IAppState} from '../states/app.state';
import {Store} from '@ngrx/store';
import {selectCartContent, selectCurrentRestaurant} from '../selectors/cart.selectors';
import {Meal} from '../models/meal.model';
import {Restaurant} from '../models/restaurant.model';
import {of} from 'rxjs';
import {initialCartState} from '../states/cart.state';

@Injectable()
export class CartEffects {
  constructor(
    private actions$: Actions,
    private store$: Store<IAppState>
  ) {}

  // On init read saved card from local storage, cast it to proper objects and set state
  init = createEffect(() => this.actions$.pipe(
    ofType(ROOT_EFFECTS_INIT),
    map(() => {
      const savedCart = JSON.parse(localStorage.getItem('cartContent'));
      const savedRestaurant = JSON.parse(localStorage.getItem('cartRestaurant'));

      if (savedCart && savedRestaurant) {
        // Cast each parsed object from local storage back to Meal objects
        const cartContent = savedCart.map(parsedMeal => {
          return new Meal(
            parsedMeal.id,
            parsedMeal.name,
            parsedMeal.description,
            parsedMeal.price,
            parsedMeal.quantity
          );
        });

        // Cast the parsed restaurant back to Restaurant object
        const restaurant = new Restaurant(
          +savedRestaurant.id,
          savedRestaurant.name,
          savedRestaurant.rating,
          savedRestaurant.type,
          savedRestaurant.street,
          +savedRestaurant.houseNumber,
          savedRestaurant.zipCode,
          savedRestaurant.city,
          savedRestaurant.image
        );

        console.log('Final parsed items:', cartContent, restaurant);
        return CartActions.addToCart({cartContent, restaurant});
      } else {
        return CartActions.addToCart({
          cartContent: initialCartState.cartContent,
          restaurant: initialCartState.cartRestaurant
        });
      }
    }),
  ));

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
        let itemAdded = false;
        const updatedCart = cartContent.map((meal: Meal) => {
          if (meal.id === action.meal.id) {
            itemAdded = true;
            return Meal.withQuantity(meal, meal.quantity + action.meal.quantity);
          } else {
            return meal;
          }
        });
        if (!itemAdded) {
          updatedCart.push(action.meal);
        }
        return CartActions.addToCart({
         cartContent: updatedCart,
         restaurant: action.restaurant
        });
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

  addToCart = createEffect(() => this.actions$.pipe(
    ofType(CartActions.addToCart),
    // Save cart to local storage for persistence
    map(() => {
      return CartActions.saveToLocal();
    })
  ));

  updateQuantity = createEffect(() => this.actions$.pipe(
    ofType(CartActions.updateQuantity),
    map(() => {
      return CartActions.saveToLocal();
    })
  ));

  removeItem = createEffect(() => this.actions$.pipe(
    ofType(CartActions.removeItem),
    map(() => {
      return CartActions.saveToLocal();
    })
  ));

  saveToLocal = createEffect(() => this.actions$.pipe(
    ofType(CartActions.saveToLocal),
    withLatestFrom(
      this.store$.select(selectCurrentRestaurant),
      this.store$.select(selectCartContent)
    ),
    tap(([action, restaurant, cartContent]) => {
      localStorage.setItem('cartContent', JSON.stringify(cartContent));
      localStorage.setItem('cartRestaurant', JSON.stringify(restaurant === undefined ? null : restaurant));
    })
  ), {dispatch: false});
}
