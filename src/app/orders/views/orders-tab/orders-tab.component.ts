import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {IAppState} from '../../../store/states/app.state';

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
