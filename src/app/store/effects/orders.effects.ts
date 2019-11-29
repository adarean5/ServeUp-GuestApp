import {Injectable} from '@angular/core';
import {OrdersService} from '../../main/services/orders.service';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Router} from '@angular/router';
import * as OrdersActions from '../actions/orders.actions';
import {catchError, map, mergeMap, tap, withLatestFrom} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {IAppState} from '../states/app.state';
import {selectCartContent, selectCurrentRestaurant} from '../selectors/cart.selectors';
import {Order} from '../models/order.model';
import * as moment from 'moment';
import {selectUser} from '../selectors/auth.selectors';
import {of} from 'rxjs';
import {MatSnackBar} from '@angular/material';
import {clearCart} from '../actions/cart.actions';

@Injectable()
export class OrdersEffects {
  constructor(
    private ordersService: OrdersService,
    private actions$: Actions,
    private router: Router,
    private store$: Store<IAppState>,
    private snackBar: MatSnackBar
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
        const arrivesIn = 60; // TODO Get actual value from user input
        const now = new Date();
        const submittedTime = moment(now).format('YYYY-MM-DDThh:mm:ss');
        const arrivalTime = moment(now).add(arrivesIn, 'm').format('YYYY-MM-DDThh:mm:ss');
        return {
          arrivalTime,
          submittedTime,
          items: cartContent,
          restaurantId: currentRestaurant.id,
          userId: user.uid
        };
      }),
      mergeMap((orderData) => {
        return this.ordersService.newOrderByUser(orderData).pipe(
          map((response: any) => {
            if (response.status === 1) {
              return OrdersActions.submitNewOrderSuccess();
            } else {
              return OrdersActions.submitNewOrderErr({err: 'Error submitting order.'});
            }
          }),
          catchError(err => of(OrdersActions.submitNewOrderErr({err})))
        );
      }),
    );
  });

  submitNewOrderSuccess = createEffect(() => this.actions$.pipe(
    ofType(OrdersActions.submitNewOrderSuccess),
    map(() => {
      const snackBarRef = this.snackBar.open('Naročilo oddano', 'Naročila', {
        duration: 3000
      });
      snackBarRef.onAction().subscribe(() => {
        this.router.navigate(['/main/orders']);
      });
      return clearCart();
    })
  ));

  getOrders = createEffect(() => {
    return this.actions$.pipe(
      ofType(OrdersActions.getOrders),
      withLatestFrom(
        this.store$.select(selectUser),
      ),
      map(([action, user]) => user.uid),
      mergeMap((userId: string) => {
        return this.ordersService.getAllOrders(userId).pipe(
          map((response: any) => {
            if (response.status === 1) {
              const orders = response.orders.map(apiOrder => Order.fromApi(apiOrder));
              return OrdersActions.getOrdersSuccess({orders});
            } else {
              return OrdersActions.getOrdersErr({err: 'Error getting orders.'});
            }
          }),
          catchError(err => of(OrdersActions.getOrdersErr({err})))
        );
      }),
    );
  });

  getOrdersErr = createEffect(() => this.actions$.pipe(
    ofType(OrdersActions.getOrdersErr),
    tap((err: any) => {
      console.error('[GetOrdersErr]', err);
    })
  ), {dispatch: false});

  checkIn = createEffect(() => this.actions$.pipe(
    ofType(OrdersActions.checkIn),
    mergeMap((action) => {
      return this.ordersService.checkIn(action.orderId, action.qrCode).pipe(
        map((response: any) => {
          if (response.status === 1) {
            return OrdersActions.checkInSuccess();
          } else {
            return OrdersActions.checkInErr({err: response.description});
          }
        }),
        catchError(err => of(OrdersActions.checkInErr({err})))
      );
    })
  ));

  checkInSuccess = createEffect(() => this.actions$.pipe(
    ofType(OrdersActions.checkInSuccess),
    map(() => {
      this.snackBar.open('Check-in uspešen.', 'Dober tek!');
      return OrdersActions.getOrders();
    })
  ));

  checkInErr = createEffect(() => this.actions$.pipe(
    ofType(OrdersActions.checkInErr),
    tap((err: any) => {
      console.error('[CheckInErr]', err);
      this.snackBar.open('Prišlo je do napake pri check-inu. Prosimo poskusite znova.', 'Skrij');
    })
  ), {dispatch: false});
}
