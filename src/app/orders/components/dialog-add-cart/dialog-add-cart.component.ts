import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-dialog-add-cart',
  templateUrl: './dialog-add-cart.component.html',
  styleUrls: ['./dialog-add-cart.component.scss']
})
export class DialogAddCartComponent implements OnInit {
  private quantity: number;
  private totalPrice: number;

  constructor(
    public dialogRef: MatDialogRef<DialogAddCartComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.quantity = 1;
    this.calculateTotal();
  }

  calculateTotal() {
    this.totalPrice = this.quantity * this.data.value;
  }

  changeQuantity(amount: number) {
    this.quantity += amount;
    this.calculateTotal();
  }

  addToCart() {
    this.dialogRef.close({id: this.data.id, quantity: this.quantity});
  }
}
