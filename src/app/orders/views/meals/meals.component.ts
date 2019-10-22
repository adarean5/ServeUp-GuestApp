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
import {take, takeWhile} from 'rxjs/operators';
import {Restaurant} from '../../../store/models/restaurant.model';
import {attemptAddToCart} from '../../../store/actions/cart.actions';
import {selectCartContent, selectTotalPrice} from '../../../store/selectors/cart.selectors';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.scss']
})

export class MealsComponent implements OnInit {
  mealTabs = {
    categories : 0,
    category: 1
  };
  restaurantId: number; // ID of the currently displayed restaurant
  meals: []; // Meals for restaurant from API
  mealCategories: any;
  loadingMeals: boolean;
  selectedCategory: string; // What to display on the category page
  selectedIndex: number; // Which tab is active
  restaurantFromId: Restaurant;
  total$: Observable<number>;

  constructor(
    private route: ActivatedRoute,
    private store: Store<IAppState>,
    private router: Router,
    private dialogAddCart: MatDialog,
    public location: Location,
  ) { }

  ngOnInit() {
    this.selectedIndex = this.mealTabs.categories;
    this.restaurantId = this.route.snapshot.params.id;

    this.total$ = this.store.select(selectTotalPrice);

    // API does not support getting restaurant by ID, so we must resort to this
    this.store.select(selectRestaurants)
      // Take the first value of restaurants that isn't undefined and then unsubscribe
      .pipe(takeWhile(restaurants => restaurants === undefined, true)).subscribe((restaurants: Restaurant[]) => {
      if (restaurants && restaurants.length > 0) {
        this.restaurantFromId = restaurants.find((restaurant: Restaurant) => {
          console.log(restaurant, +this.restaurantId);
          return restaurant.id === +this.restaurantId;
        });
      }
    });

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

    // TODO just for testing, remove later
    this.store.select(selectCartContent).subscribe(cartContent => {
      console.log('Cart content: ', cartContent);
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
      if (result) {
        this.store.dispatch(attemptAddToCart({
          meal: Meal.withQuantity(this.getMealById(result.id), result.quantity),
          restaurant: this.restaurantFromId
        }));
      }
    });
  }

  getMealById(id: number): Meal {
    return this.meals[this.selectedCategory].find((meal: Meal) => {
      return meal.id === id;
    });
  }
}
