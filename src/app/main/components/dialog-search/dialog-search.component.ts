import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {Store} from '@ngrx/store';
import {IAppState} from '../../../store/states/app.state';
import {closeSearchDialog, getRestaurantTypes, searchRestaurants} from '../../../store/actions/home.actions';
import {RestaurantType} from '../../../store/models/restaurant-type.model';
import {selectRestaurantTypes} from '../../../store/selectors/home.selector';

@Component({
  selector: 'app-dialog-search',
  templateUrl: './dialog-search.component.html',
  styleUrls: ['./dialog-search.component.scss']
})
export class DialogSearchComponent implements OnInit {
  location: string;
  foodType: string;

  restaurantTypes: RestaurantType[];

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
    this.store.dispatch(searchRestaurants({location: this.location, restaurantType: this.foodType}));
    this.dialogRef.close();
    console.log(this.foodType, this.location);
  }
}
