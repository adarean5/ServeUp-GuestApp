import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {IAppState} from '../../../store/states/app.state';
import {selectCartContent} from '../../../store/selectors/cart.selectors';
import {Meal} from '../../../store/models/meal.model';
import {Restaurant} from '../../../store/models/restaurant.model';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-orders-tab',
  templateUrl: './orders-tab.component.html',
  styleUrls: ['./orders-tab.component.scss']
})
export class OrdersTabComponent implements OnInit {


  constructor(
    private store: Store<IAppState>
  ) { }

  ngOnInit() {
    // this.store.select(selectCartContent).pipe(take(1))
  }

}
