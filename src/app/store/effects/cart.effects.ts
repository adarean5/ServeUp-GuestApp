import * as CartActions from '../actions/cart.actions';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {concatMap, map, switchMap, withLatestFrom} from 'rxjs/operators';
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
    withLatestFrom(this.store$.select(selectCurrentRestaurant)),
    map(([action, currentRestaurant]) => {
      console.log('[Attempt add to cart]', action, currentRestaurant);
      return CartActions.addToCart({meal: action.meal});
    })
  ));
}
