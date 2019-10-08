import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {Restaurant} from '../../../store/models/restaurant.model';

@Component({
  selector: 'app-restaurant-grid',
  templateUrl: './restaurant-grid.component.html',
  styleUrls: ['./restaurant-grid.component.scss']
})
export class RestaurantGridComponent implements OnInit {
  @HostBinding('class.container-fluid')

  @Input() restaurants: Restaurant[];

  constructor() { }

  ngOnInit() {
  }

}
