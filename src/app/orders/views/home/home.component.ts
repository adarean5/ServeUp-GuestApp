import { Component, OnInit } from '@angular/core';
import {IAppState} from '../../../store/states/app.state';
import {Store} from '@ngrx/store';
import {selectRestaurants} from '../../../store/selectors/home.selector';
import {openSearchDialog, getMealsForRestaurant} from '../../../store/actions/home.actions';
import {Restaurant} from '../../../store/models/restaurant.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private restaurants: Restaurant[];

  constructor(
    private store: Store<IAppState>,
    private router: Router
  ) { }

  ngOnInit() {
    this.store.select(selectRestaurants).subscribe((restaurants: Restaurant[]) => {
      this.restaurants = restaurants;
    });
  }

  private openSearchDialog() {
    this.store.dispatch(openSearchDialog());
  }

  private restaurantClicked(restaurantId: number) {
    this.router.navigate(['/main/meals', restaurantId]);
    // this.store.dispatch(getMealsForRestaurant({restaurantId}));
  }
}
