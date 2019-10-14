import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainViewComponent } from './views/main-view/main-view.component';
import { MaterialModule } from '../shared/material/material.module';
import { ProfileComponent } from './views/profile/profile.component';
import {StoreModule} from '@ngrx/store';
import {authReducers} from '../store/reducers/auth.reducers';
import {EffectsModule} from '@ngrx/effects';
import {AuthEffects} from '../store/effects/auth.effects';
import {SharedModule} from '../shared/shared.module';
import { HomeComponent } from './views/home/home.component';
import { HomeCardComponent } from './components/home-card/home-card.component';
import { BarRatingModule } from 'ngx-bar-rating';
import {RouterModule} from '@angular/router';
import {MainTabsComponent} from './views/main-tabs/main-tabs.component';
import { OrdersTabComponent } from './views/orders-tab/orders-tab.component';
import { DialogSearchComponent } from './components/dialog-search/dialog-search.component';
import { RestaurantGridComponent } from './components/restaurant-grid/restaurant-grid.component';
import { RestaurantSearchDisplayComponent } from './views/restaurant-search-display/restaurant-search-display.component';
import { ListLayoutComponent } from './components/list-layout/list-layout.component';
import { IconButtonComponent } from './components/icon-button/icon-button.component';
import { MealsComponent } from './views/meals/meals.component';
import { MealCardComponent } from './components/meal-card/meal-card.component';
import { DialogAddCartComponent } from './components/dialog-add-cart/dialog-add-cart.component';
import { LoadingComponent } from './components/loading/loading.component';

@NgModule({
  declarations: [
    MainViewComponent,
    ProfileComponent,
    HomeComponent,
    HomeCardComponent,
    MainTabsComponent,
    OrdersTabComponent,
    DialogSearchComponent,
    RestaurantGridComponent,
    RestaurantSearchDisplayComponent,
    ListLayoutComponent,
    IconButtonComponent,
    MealsComponent,
    MealCardComponent,
    DialogAddCartComponent,
    LoadingComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    StoreModule.forFeature('auth', authReducers),
    EffectsModule.forFeature([AuthEffects]),
    SharedModule,
    BarRatingModule,
    RouterModule
  ],
  entryComponents: [
    DialogSearchComponent,
    DialogAddCartComponent
  ]
})
export class OrdersModule { }
