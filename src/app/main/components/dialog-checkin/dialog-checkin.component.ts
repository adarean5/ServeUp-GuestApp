import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Meal} from '../../../store/models/meal.model';

@Component({
  selector: 'app-dialog-checkin',
  templateUrl: './dialog-checkin.component.html',
  styleUrls: ['./dialog-checkin.component.scss']
})
export class DialogCheckinComponent implements OnInit {
  /*restaurantName: string;
  restaurantId: number;
  items: Meal[];*/

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      restaurantName: string;
      restaurantId: number;
      items: Meal[];
    },
    public dialogRef: MatDialogRef<DialogCheckinComponent>
  ) { }

  ngOnInit() {
    /*this.restaurantName = this.data.restaurantName;
    this.restaurantId = this.*/
  }

}
