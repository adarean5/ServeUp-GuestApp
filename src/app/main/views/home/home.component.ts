import {Component, OnDestroy, OnInit} from '@angular/core';
import {IAppState} from '../../../store/states/app.state';
import {Store} from '@ngrx/store';
import {selectLoadingRestaurants, selectRestaurants} from '../../../store/selectors/home.selector';
import {openSearchDialog} from '../../../store/actions/home.actions';
import {Restaurant} from '../../../store/models/restaurant.model';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  loadingRestaurants: boolean;
  restaurants: Restaurant[];

  constructor(
    private store: Store<IAppState>,
    private router: Router
  ) { }

  ngOnInit() {
    this.subscription = new Subscription();
    this.subscription.add(this.store.select(selectLoadingRestaurants).subscribe((loading: boolean) => {
      this.loadingRestaurants = loading;
    }));
    this.subscription.add( this.store.select(selectRestaurants).subscribe((restaurants: Restaurant[]) => {
      this.restaurants = restaurants;
    }));
  }

  openSearchDialog() {
    this.store.dispatch(openSearchDialog());
  }

  restaurantClicked(restaurantId: number) {
    this.router.navigate(['/main/meals', restaurantId]);
    // this.store.dispatch(getMealsForRestaurant({restaurantId}));
  }

  homeCardTrack(index: number, restaurant: Restaurant) {
    return restaurant.id;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
