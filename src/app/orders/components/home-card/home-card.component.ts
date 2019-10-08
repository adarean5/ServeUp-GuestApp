import {Component, Directive, EventEmitter, HostBinding, HostListener, Input, OnInit, Output} from '@angular/core';
import {Restaurant} from '../../../store/models/restaurant.model';

@Component({
  selector: 'app-home-card',
  templateUrl: './home-card.component.html',
  styleUrls: ['./home-card.component.scss'],
})

export class HomeCardComponent implements OnInit {
  @Input() restaurant: Restaurant;

  @Output() clickEmitter: EventEmitter<number> = new EventEmitter<number>();

  @HostBinding('class.col-sm-12')
  @HostBinding('class.col-md-6')
  @HostBinding('class.col-lg-6')
  @HostBinding('class.col-xl-4')
  @HostBinding('class.col-xxl-3')

  @HostListener('click', ['$event']) onClick() {
    console.log('Clicked restaurant:', this.restaurant.id);
    this.clickEmitter.emit(this.restaurant.id);
  }

  constructor() { }


  ngOnInit() {
  }
}
