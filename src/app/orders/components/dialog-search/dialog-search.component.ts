import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {Store} from '@ngrx/store';
import {IAppState} from '../../../store/states/app.state';
import {closeSearchDialog, getRestaurantTypes} from '../../../store/actions/home.actions';
import {RestaurantType} from '../../../store/models/restaurant-type.model';
import {selectRestaurantTypes} from '../../../store/selectors/home.selector';

@Component({
  selector: 'app-dialog-search',
  templateUrl: './dialog-search.component.html',
  styleUrls: ['./dialog-search.component.scss']
})
export class DialogSearchComponent implements OnInit {
  private location: string;
  private foodType: string;

  private restaurantTypes: RestaurantType[];

  constructor(
    public dialogRef: MatDialogRef<DialogSearchComponent>,
    private store: Store<IAppState>
  ) { }

  ngOnInit() {
    this.store.select(selectRestaurantTypes).subscribe((newTypes: RestaurantType[]) => {
      this.restaurantTypes = newTypes;
    });
    this.store.dispatch(getRestaurantTypes());
    this.dialogRef.afterClosed().subscribe(result => {
      this.store.dispatch(closeSearchDialog());
    });
  }

  search() {
    this.dialogRef.close();
    console.log(this.foodType, this.location);
  }

  changeFoodType(event) {
    console.log(event);
  }

}
