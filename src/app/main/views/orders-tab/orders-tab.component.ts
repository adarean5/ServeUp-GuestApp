import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {IAppState} from '../../../store/states/app.state';
import {getOrders} from '../../../store/actions/orders.actions';

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
    this.store.dispatch(getOrders());
  }

}
