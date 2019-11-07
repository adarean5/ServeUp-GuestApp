import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ReplaySubject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent implements OnInit {
  @Input() debounceTime = 0;
  @Input() quantity = 1;
  @Input() change = 1;
  @Input() min = 1;
  @Output() updateQuantity: EventEmitter<number> = new EventEmitter();

  quantityUpdate: ReplaySubject<undefined>;

  constructor() { }

  ngOnInit() {
    this.quantityUpdate = new ReplaySubject(undefined);
    // Only emit updated quantity after user stops clicking for a while
    this.quantityUpdate.pipe(debounceTime(this.debounceTime)).subscribe((newQuantity: number) => {
      this.updateQuantity.emit(this.quantity);
    });
  }

  changeQuantity(quantity: number) {
    console.log(this.quantity, quantity);
    this.quantity += quantity;
    this.quantityUpdate.next();
  }

}
