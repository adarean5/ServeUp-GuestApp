import { Component, OnInit } from '@angular/core';
import {IAppState} from '../../../store/states/app.state';
import {Store} from '@ngrx/store';
import {selectRestaurants} from '../../../store/selectors/home.selector';
import {openSearchDialog} from '../../../store/actions/home.actions';
import {Restaurant} from '../../../store/models/restaurant.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private restaurants: Restaurant[];

  constructor(
    private store: Store<IAppState>
  ) { }

  ngOnInit() {
    this.store.select(selectRestaurants).subscribe((restaurants: Restaurant[]) => {
      this.restaurants = restaurants;
      console.log('Restaurants from home tab', this.restaurants);
    });
  }

  private openSearchDialog() {
    this.store.dispatch(openSearchDialog());
  }

  private restaurantClicked(restaurantId: number) {
    console.log('Restaurant clicked main', restaurantId);
  }
}
