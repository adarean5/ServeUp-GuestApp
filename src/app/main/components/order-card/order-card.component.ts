import {Component, Input, OnInit} from '@angular/core';
import {Order} from '../../../store/models/order.model';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss']
})
export class OrderCardComponent implements OnInit {
  @Input() order: Order;
  status = [
    'NOVO',
    'PRIPRAVLJENO',
    'ZAKLJUČENO'
  ];

  constructor() { }

  ngOnInit() {
  }
}
