import {Component, OnInit} from '@angular/core';
import {Meal} from '../../../store/models/meal.model';
import {Restaurant} from '../../../store/models/restaurant.model';
import {Store} from '@ngrx/store';
import {IAppState} from '../../../store/states/app.state';
import {selectCartContent, selectCurrentRestaurant} from '../../../store/selectors/cart.selectors';
import {takeWhile} from 'rxjs/operators';
import {addToCart, attemptAddToCart, updateQuantity} from '../../../store/actions/cart.actions';
import {ReplaySubject} from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  objectKeys = Object.keys;
  cartContent: {[mealId: number]: Meal};
  cartContentArray: Meal[];
  restaurant: Restaurant;

  constructor(
    private store: Store<IAppState>
  ) { }

  ngOnInit() {
    this.cartContent = {};
    this.store.select(selectCartContent)
      .pipe(takeWhile(cartContent => cartContent === undefined, true))
      .subscribe(cartContent => {
        /*this.cartContent = cartContent;
        console.log('Component cart content', this.cartContent);*/
        /*Object.keys(cartContent).forEach((key: string) => {
          if (!this.cartContent[key]) {
            this.cartContent[key] = cartContent[key];
          }
        });*/
        /*this.cartContent = cartContent;
        this.cartContentArray = Object.keys(cartContent).map((key) => cartContent[key]);*/
        Object.keys(cartContent).forEach((key) => {
          this.cartContent[key] = Meal.withQuantity(cartContent[key], cartContent[key].quantity)
        });
    });

    this.store.select(selectCurrentRestaurant)
      .pipe(takeWhile(cartRestaurant => cartRestaurant === undefined, true))
      .subscribe((cartRestaurant: Restaurant) => {
        this.restaurant = cartRestaurant;
        console.log('Component restaurant', this.restaurant);
      });
  }

  updateQuantity(id: number, newQuantity: number) {
    console.log('Update quantity', id, newQuantity);
    /*const difference = newQuantity - this.cartContent[id].quantity;
    // this.cartContent[id] = Meal.withQuantity(this.cartContent[id], newQuantity);
    this.store.dispatch(attemptAddToCart({
      meal: Meal.withQuantity(this.cartContent[id], difference),
      restaurant: this.restaurant
    }));
    console.log('Amount to update', difference);*/
    // Object.defineProperty(this.cartContent[id], 'quantity', {value: newQuantity});
    this.cartContent[id].quantity = newQuantity;
    this.store.dispatch(updateQuantity({
      meal: Meal.withQuantity(this.cartContent[id], newQuantity),
      restaurant: this.restaurant
    }));
  }

  deleteItem(id: number) {
    console.log('Delete item', id, this.cartContent[id]);
    console.log(this.cartContent);
    delete this.cartContent[id];
  }
}
