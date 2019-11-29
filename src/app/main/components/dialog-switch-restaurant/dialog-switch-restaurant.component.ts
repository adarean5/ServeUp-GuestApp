import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dialog-switch-restaurant',
  templateUrl: './dialog-switch-restaurant.component.html',
  styleUrls: ['./dialog-switch-restaurant.component.scss']
})
export class DialogSwitchRestaurantComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogSwitchRestaurantComponent>,
    public router: Router
  ) { }

  ngOnInit() {
    console.log('Dialog data:', this.data);
  }
}
