import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {IAppState} from '../../../store/states/app.state';
import {checkIn, getOrders} from '../../../store/actions/orders.actions';
import {Order} from '../../../store/models/order.model';
import {Observable} from 'rxjs';
import {selectAllOrders, selectCheckingIn, selectGettingOrders} from '../../../store/selectors/orders.selectors';
import {MatDialog} from '@angular/material';
import {DialogCheckinComponent} from '../../components/dialog-checkin/dialog-checkin.component';
import {Meal} from '../../../store/models/meal.model';

@Component({
  selector: 'app-orders-tab',
  templateUrl: './orders-tab.component.html',
  styleUrls: ['./orders-tab.component.scss']
})
export class OrdersTabComponent implements OnInit {
  orders$: Observable<Order[]>;
  loadingOrders$: Observable<boolean>;
  checkingIn$: Observable<boolean>;

  constructor(
    private store: Store<IAppState>,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.orders$ = this.store.select(selectAllOrders);
    this.loadingOrders$ = this.store.select(selectGettingOrders);
    this.checkingIn$ = this.store.select(selectCheckingIn);
    this.store.dispatch(getOrders());
  }

  displayDetails(orderId: number, restaurantName: string, items: Meal[], checkedIn: boolean) {
    const dialogCheckin = this.dialog.open(DialogCheckinComponent, {
      panelClass: ['sup-dialog', 'checkin'],
      maxWidth: '100vw',
      maxHeight: '100vh',
      autoFocus: false,
      data : {
        orderId,
        restaurantName,
        items,
        checkedIn
      }
    });

    dialogCheckin.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(checkIn({
          qrCode: result.qrResultString,
          orderId: result.orderId
        }));
      }
    });
  }
}
