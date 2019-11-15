import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {IAppState} from '../../../store/states/app.state';
import {getOrders} from '../../../store/actions/orders.actions';
import {Order} from '../../../store/models/order.model';
import {Observable} from 'rxjs';
import {selectAllOrders, selectGettingOrders} from '../../../store/selectors/orders.selectors';

@Component({
  selector: 'app-orders-tab',
  templateUrl: './orders-tab.component.html',
  styleUrls: ['./orders-tab.component.scss']
})
export class OrdersTabComponent implements OnInit {
  orders$: Observable<Order[]>;
  loadingOrders$: Observable<boolean>;

  constructor(
    private store: Store<IAppState>
  ) { }

  ngOnInit() {
    this.orders$ = this.store.select(selectAllOrders);
    this.loadingOrders$ = this.store.select(selectGettingOrders);
    this.store.dispatch(getOrders());
  }

  displayDetails(orderId: number) {
    console.log(orderId);
  }
}
