import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {IAppState} from '../../../store/states/app.state';
import {Restaurant} from '../../../store/models/restaurant.model';
import {selectLoadingSearch, selectRestaurants, selectRestaurantsSearch} from '../../../store/selectors/home.selector';

@Component({
  selector: 'app-restaurant-search-display',
  templateUrl: './restaurant-search-display.component.html',
  styleUrls: ['./restaurant-search-display.component.scss']
})
export class RestaurantSearchDisplayComponent implements OnInit {
  private restaurants: Restaurant[];
  private loading: boolean;

  constructor(private store: Store<IAppState>) { }

  ngOnInit() {
    this.store.select(selectLoadingSearch).subscribe((loading: boolean) => {
      this.loading = loading;
    });
    this.store.select(selectRestaurants).subscribe((restaurants: Restaurant[]) => {
      this.restaurants = restaurants;
    });
  }

  cardClicked(restaurantId: number) {
    console.log('Card clicked from search', restaurantId);
  }
}
