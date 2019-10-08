import {Component, EventEmitter, HostBinding, Input, OnInit, Output} from '@angular/core';
import {Restaurant} from '../../../store/models/restaurant.model';

@Component({
  selector: 'app-restaurant-grid',
  templateUrl: './restaurant-grid.component.html',
  styleUrls: ['./restaurant-grid.component.scss']
})
export class RestaurantGridComponent implements OnInit {
  @HostBinding('class.container-fluid')

  @Input() restaurants: Restaurant[];

  @Output() rIdEmitter: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {}

  emitClickedRestaurant(restaurantId: number) {
    console.log('Restaurant id from grid', restaurantId);
    this.rIdEmitter.emit(restaurantId);
  }

}
