import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {Restaurant} from '../../../store/models/restaurant.model';

@Component({
  selector: 'app-home-card',
  templateUrl: './home-card.component.html',
  styleUrls: ['./home-card.component.scss'],
})
export class HomeCardComponent implements OnInit {
  @HostBinding('class.col-sm-12')
  @HostBinding('class.col-md-6')
  @HostBinding('class.col-lg-6')
  @HostBinding('class.col-xl-4')
  @HostBinding('class.col-xxl-3')

  @Input() restaurant: Restaurant;

  constructor() { }

  ngOnInit() {
  }

}
