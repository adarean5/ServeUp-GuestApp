import {Component, OnInit} from '@angular/core';
import {Meal} from '../../../store/models/meal.model';
import {Restaurant} from '../../../store/models/restaurant.model';
import {Store} from '@ngrx/store';
import {IAppState} from '../../../store/states/app.state';
import {selectCartContent, selectCurrentRestaurant, selectTotalPrice} from '../../../store/selectors/cart.selectors';
import {tap} from 'rxjs/operators';
import {removeItem, updateQuantity} from '../../../store/actions/cart.actions';
import {Observable} from 'rxjs';
import {MatDialog} from '@angular/material';
import {DialogPaymentComponent} from '../../components/dialog-payment/dialog-payment.component';
import {submitNewOrder} from '../../../store/actions/orders.actions';
import {selectSubmittingOrder} from '../../../store/selectors/orders.selectors';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  restaurant: Restaurant;
  cartContent$: Observable<{[mealId: number]: Meal}>;
  cartRestaurant$: Observable<Restaurant>;
  totalPrice$: Observable<any>;
  submittingOrder$: Observable<boolean>;

  constructor(
    private store: Store<IAppState>,
    private dialogPaymentOption: MatDialog
  ) { }

  ngOnInit() {
    this.cartContent$ = this.store.select(selectCartContent).pipe();
    this.cartRestaurant$ = this.store.select(selectCurrentRestaurant).pipe(
      tap((newRestaurant: Restaurant) => this.restaurant = newRestaurant)
    );
    this.totalPrice$ = this.store.select(selectTotalPrice);
    this.submittingOrder$ = this.store.select(selectSubmittingOrder);
  }

  updateQuantity(mealId: number, quantity: number) {
    this.store.dispatch(updateQuantity({
      mealId,
      quantity
    }));
  }

  deleteItem(mealId: number) {
    this.store.dispatch(removeItem({mealId}));
  }

  openPaymentDialog() {
    const dialogRefPayment = this.dialogPaymentOption.open(DialogPaymentComponent);
    dialogRefPayment.afterClosed().subscribe((paymentOption: string) => {
      if (paymentOption) {
        this.store.dispatch(submitNewOrder());
      }
    });
  }

  mealTrack(index: number, meal: Meal) {
    return meal.id;
  }
}
