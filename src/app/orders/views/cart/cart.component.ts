import { Component, OnInit } from '@angular/core';
import {Meal} from '../../../store/models/meal.model';
import {Restaurant} from '../../../store/models/restaurant.model';
import {Store} from '@ngrx/store';
import {IAppState} from '../../../store/states/app.state';
import {selectCartContent, selectCurrentRestaurant} from '../../../store/selectors/cart.selectors';
import {takeWhile} from 'rxjs/operators';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  objectKeys = Object.keys;
  cartContent: {[mealId: number]: Meal};
  restaurant: Restaurant;

  constructor(
    private store: Store<IAppState>
  ) { }

  ngOnInit() {
    this.store.select(selectCartContent)
      .pipe(takeWhile(cartContent => cartContent === undefined, true))
      .subscribe(cartContent => {
        this.cartContent = cartContent;
        console.log('Component cart content', this.cartContent);
    });

    this.store.select(selectCurrentRestaurant)
      .pipe(takeWhile(cartRestaurant => cartRestaurant === undefined, true))
      .subscribe((cartRestaurant: Restaurant) => {
        this.restaurant = cartRestaurant;
        console.log('Component restaurant', this.restaurant);
      });
  }

}
