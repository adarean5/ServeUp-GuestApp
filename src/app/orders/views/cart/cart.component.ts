import {Component, OnInit} from '@angular/core';
import {Meal} from '../../../store/models/meal.model';
import {Restaurant} from '../../../store/models/restaurant.model';
import {Store} from '@ngrx/store';
import {IAppState} from '../../../store/states/app.state';
import {selectCartContent, selectCurrentRestaurant, selectTotalPrice} from '../../../store/selectors/cart.selectors';
import {map, takeWhile, tap} from 'rxjs/operators';
import {addToCart, attemptAddToCart, updateQuantity} from '../../../store/actions/cart.actions';
import {Observable, ReplaySubject} from 'rxjs';

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
    private store: Store<IAppState>
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

  updateQuantity(mealToUpdate: any, newQuantity: number) {
    console.log('Update quantity', mealToUpdate, newQuantity);
    this.store.dispatch(updateQuantity({
      meal: Meal.withQuantity(mealToUpdate, newQuantity),
      restaurant: this.restaurant
    }));
  }

  deleteItem(id: number) {
    console.log('Delete id', id);
  }

  mealTrack(index, item) {
    return item.key;
  }

  func(r) {
    console.log('Func', r);
    return r;
  }
}
