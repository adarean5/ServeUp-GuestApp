import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {IAppState} from '../../../store/states/app.state';
import {Restaurant} from '../../../store/models/restaurant.model';
import {selectLoadingSearch, selectRestaurantsSearch} from '../../../store/selectors/home.selector';
import {Router} from '@angular/router';

@Component({
  selector: 'app-restaurant-search-display',
  templateUrl: './restaurant-search-display.component.html',
  styleUrls: ['./restaurant-search-display.component.scss']
})
export class RestaurantSearchDisplayComponent implements OnInit {
  restaurants: Restaurant[];
  loadingSearch: boolean;

  constructor(
    private store: Store<IAppState>,
    public router: Router
  ) { }

  ngOnInit() {
    this.store.select(selectLoadingSearch).subscribe((loading: boolean) => {
      this.loadingSearch = loading;
    });
    this.store.select(selectRestaurantsSearch).subscribe((restaurants: Restaurant[]) => {
      this.restaurants = restaurants;
    });
  }

  cardClicked(restaurantId: number) {
    this.router.navigate(['/main/meals', restaurantId]);
  }
}
