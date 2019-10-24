import {Component, HostBinding, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-meal-card',
  templateUrl: './meal-card.component.html',
  styleUrls: ['./meal-card.component.scss']
})

export class MealCardComponent implements OnInit {
  @HostBinding('class.col-12')

  @Input() title: string;
  @Input() info?: string;
  @Input() value?: number;
  @Input() showActions = false;

  constructor() { }

  ngOnInit() {
  }

}
