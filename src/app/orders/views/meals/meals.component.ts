import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {getMealsForRestaurant} from '../../../store/actions/home.actions';
import {Store} from '@ngrx/store';
import {IAppState} from '../../../store/states/app.state';
import {Location} from '@angular/common';
import {selectLoadingMeals, selectMeals} from '../../../store/selectors/home.selector';

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
  private restaurantId: number;
  private meals: any;
  private mealCategories: any;
  private loadingMeals: boolean;
  private selectedCategory: string;
  private selectedIndex: number;

  constructor(
    private route: ActivatedRoute,
    private store: Store<IAppState>,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit() {
    this.selectedIndex = this.mealTabs.categories;
    this.selectedCategory = 'Glavne jedi';
    this.restaurantId = this.route.snapshot.params.id;
    this.selectedIndex = this.mealTabs.category;

    this.store.select(selectLoadingMeals).subscribe((loadingMeals: boolean) => {
      this.loadingMeals = loadingMeals;
    });
    this.store.select(selectMeals).subscribe(meals => {
      if (meals) {
        this.meals = meals;
        console.log('Meals from meals', this.meals);
        this.mealCategories = Object.keys(meals);
        console.log(this.mealCategories);
      }
    });

    this.store.dispatch(getMealsForRestaurant({restaurantId: this.restaurantId}));
  }

  categoryClicked(category: string) {
    console.log(category);
    this.selectedCategory = category;
    this.selectedIndex = this.mealTabs.category;
    console.log(this.meals[this.selectedCategory]);
  }
}
