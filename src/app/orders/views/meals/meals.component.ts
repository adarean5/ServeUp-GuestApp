import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {getMealsForRestaurant} from '../../../store/actions/home.actions';
import {Store} from '@ngrx/store';
import {IAppState} from '../../../store/states/app.state';

@Component({
  selector: 'app-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.scss']
})
export class MealsComponent implements OnInit {
  private restaurantId: number;
  private meals: any;

  constructor(
    private route: ActivatedRoute,
    private store: Store<IAppState>
  ) { }

  ngOnInit() {
    this.restaurantId = this.route.snapshot.params.id;
    this.store.dispatch(getMealsForRestaurant({restaurantId: this.restaurantId}));
  }

}
