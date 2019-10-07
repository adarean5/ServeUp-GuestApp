import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-dialog-search',
  templateUrl: './dialog-search.component.html',
  styleUrls: ['./dialog-search.component.scss']
})
export class DialogSearchComponent implements OnInit {
  private location: string;
  private foodType: string;

  constructor(
    public dialogRef: MatDialogRef<DialogSearchComponent>
  ) { }

  ngOnInit() {
  }

  search() {
    this.dialogRef.close();
    console.log(this.foodType, this.location);
  }

  changeFoodType(event) {
    console.log(event);
  }

}
