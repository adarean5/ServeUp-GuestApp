import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-dialog-payment',
  templateUrl: './dialog-payment.component.html',
  styleUrls: ['./dialog-payment.component.scss']
})
export class DialogPaymentComponent implements OnInit {
  paymentOptions = [
    'MasterCard',
    'Visa',
    'PayPal'
  ];
  selectedOption = '';

  constructor() { }

  ngOnInit() {
  }

}
