import {Component, EventEmitter, HostBinding, Input, OnInit, Output} from '@angular/core';
import {Restaurant} from '../../../store/models/restaurant.model';

@Component({
  selector: 'app-restaurant-grid',
  templateUrl: './restaurant-grid.component.html',
  styleUrls: ['./restaurant-grid.component.scss']
})
@HostBinding('class.container-fluid')
export class RestaurantGridComponent implements OnInit {

  constructor() { }

  ngOnInit() {}
}
