import {Component, OnInit} from '@angular/core';
import {Meal} from '../../../store/models/meal.model';
import {Restaurant} from '../../../store/models/restaurant.model';
import {Store} from '@ngrx/store';
import {IAppState} from '../../../store/states/app.state';
import {selectCartContent, selectCurrentRestaurant, selectTotalPrice} from '../../../store/selectors/cart.selectors';
import {map, takeWhile, tap} from 'rxjs/operators';
import {addToCart, attemptAddToCart, removeItem, updateQuantity} from '../../../store/actions/cart.actions';
import {Observable, ReplaySubject} from 'rxjs';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {DialogPaymentComponent} from '../../components/dialog-payment/dialog-payment.component';

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

  constructor(
    private store: Store<IAppState>,
    private dialogPaymentOption: MatDialog
  ) { }

  ngOnInit() {
    this.cartContent$ = this.store.select(selectCartContent).pipe(
      tap((response) => console.log('Cart restaurants', response))
    );
    this.cartRestaurant$ = this.store.select(selectCurrentRestaurant).pipe(
      tap((newRestaurant: Restaurant) => this.restaurant = newRestaurant)
    );
    this.totalPrice$ = this.store.select(selectTotalPrice);
  }

  updateQuantity(mealId: number, quantity: number) {
    console.log('Update quantity', mealId, quantity);
    this.store.dispatch(updateQuantity({
      mealId,
      quantity
    }));
  }

  deleteItem(mealId: number) {
    console.log('Delete id', mealId);
    this.store.dispatch(removeItem({mealId}));
  }

  openPaymentDialog() {
    console.log('Open dialog');
    const dialogRefPayment = this.dialogPaymentOption.open(DialogPaymentComponent);
    dialogRefPayment.afterClosed().subscribe((paymentOption: string) => {
      console.log(paymentOption);
    });
  }
}
