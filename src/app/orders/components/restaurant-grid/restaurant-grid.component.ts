import {Component, HostBinding, OnInit} from '@angular/core';

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
