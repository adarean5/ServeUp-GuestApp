import {Injectable} from '@angular/core';
import {OrdersService} from '../../main/services/orders.service';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Router} from '@angular/router';
import * as OrdersActions from '../actions/orders.actions';
import {map, mergeMap, withLatestFrom} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {IAppState} from '../states/app.state';
import {selectCartContent, selectCurrentRestaurant} from '../selectors/cart.selectors';
import {Order} from '../models/order.model';
import * as moment from 'moment';
import {selectUser} from '../selectors/auth.selectors';

@Injectable()
export class OrdersEffects {
  constructor(
    private ordersService: OrdersService,
    private actions$: Actions,
    private router: Router,
    private store$: Store<IAppState>
  ) {}

  submitNewOrder = createEffect(() => {
    return this.actions$.pipe(
      ofType(OrdersActions.submitNewOrder),
      withLatestFrom(
        this.store$.select(selectCartContent),
        this.store$.select(selectCurrentRestaurant),
        this.store$.select(selectUser)
      ),
      map(([action, cartContent, currentRestaurant, user]) => {
        console.log('Cart content EFFECTS', cartContent);
        const arrivesIn = 60; // TODO Get actual value from user input
        const now = new Date();
        const submittedTime = moment(now).format('YYYY-MM-DD"T"hh:mm:ss');
        const arrivalTime = moment(now).add(arrivesIn, 'm').format('YYYY-MM-DD"T"hh:mm:ss');
        console.log(submittedTime);
        console.log(arrivalTime);
        return new Order(
          arrivalTime,
          submittedTime,
          currentRestaurant.id,
          user.uid,
          cartContent
        );
      }),
      mergeMap((apiOrder: Order) => {
        return this.ordersService.newOrderByUser(apiOrder).pipe(
          map(() => {
            return OrdersActions.submitNewOrderErr({error: false});
          })
        );
      })
    );
  });
}
