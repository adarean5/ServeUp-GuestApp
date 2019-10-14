import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {getMealsForRestaurant} from '../../../store/actions/home.actions';
import {Store} from '@ngrx/store';
import {IAppState} from '../../../store/states/app.state';
import {Location} from '@angular/common';
import {selectLoadingMeals, selectMeals, selectRestaurants} from '../../../store/selectors/home.selector';
import {MatDialog} from '@angular/material';
import {DialogAddCartComponent} from '../../components/dialog-add-cart/dialog-add-cart.component';
import {Meal} from '../../../store/models/meal.model';
import {take} from 'rxjs/operators';
import {Restaurant} from '../../../store/models/restaurant.model';

@Component({
  selector: 'app-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.scss']
})

export class MealsComponent implements OnInit {
  private mealTabs = {
    categories : 0,
    category: 1
  };
  private restaurantId: number; // ID of the currently displayed restaurant
  private meals: []; // Meals for restaurant from API
  private mealCategories: any;
  private loadingMeals: boolean;
  private selectedCategory: string; // What to display on the category page
  private selectedIndex: number; // Which tab is active

  constructor(
    private route: ActivatedRoute,
    private store: Store<IAppState>,
    private router: Router,
    private location: Location,
    private dialogAddCart: MatDialog
  ) { }

  ngOnInit() {
    this.selectedIndex = this.mealTabs.categories;
    this.restaurantId = this.route.snapshot.params.id;
    /*this.selectedCategory = 'Glavne jedi'; // TODO Remove
    this.selectedIndex = this.mealTabs.category; // TODO Remove*/

    // Get updates on api meal loading status
    this.store.select(selectLoadingMeals).subscribe((loadingMeals: boolean) => {
      this.loadingMeals = loadingMeals;
    });

    // Get meals and meal categories from store
    this.store.select(selectMeals).subscribe(meals => {
      if (meals) {
        this.meals = meals;
        console.log('Meals from meals', this.meals);
        this.mealCategories = Object.keys(meals);
        console.log(this.mealCategories);
      }
    });

    // Start loading meals for current restaurantId
    this.store.dispatch(getMealsForRestaurant({restaurantId: this.restaurantId}));
  }

  categoryClicked(category: string) {
    console.log(category);
    this.selectedCategory = category;
    this.selectedIndex = this.mealTabs.category;
    console.log(this.meals[this.selectedCategory]);
  }

  mealClicked(mealId: number) {
    const meal = this.getMealById(mealId);
    const dialogRefCart = this.dialogAddCart.open(DialogAddCartComponent, {
      maxHeight: '80vh',
      autoFocus: false,
      data: {
        name: meal.name,
        description: meal.description,
        value: meal.price,
        id: meal.id
      }
    });
    dialogRefCart.afterClosed().subscribe(result => {
      console.log(result, this.getMealById(result.id));
      let restaurantFromId;
      this.store.select(selectRestaurants).pipe(take(1)).subscribe((restaurants: Restaurant[]) => {
        console.log('RRRR', restaurants);
        const correctRestaurant = restaurants.find((restaurant: Restaurant) => {
          console.log(restaurant, +this.restaurantId);
          return restaurant.id === +this.restaurantId;
        });
        restaurantFromId = correctRestaurant; // TODO WORKS Send it to store
      });
      console.log('Correct restaurant', restaurantFromId);
      // this.store.dispatch()
    });
  }

  getMealById(id: number): Meal {
    return this.meals[this.selectedCategory].find((meal: Meal) => {
      return meal.id === id;
    });
  }
}
