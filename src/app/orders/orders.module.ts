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
import { RestaurantMealsComponent } from './views/restaurant-meals/restaurant-meals.component';
import {MainTabsComponent} from './views/main-tabs/main-tabs.component';
import { OrdersTabComponent } from './views/orders-tab/orders-tab.component';
import { DialogSearchComponent } from './components/dialog-search/dialog-search.component';
import { RestaurantGridComponent } from './components/restaurant-grid/restaurant-grid.component';

@NgModule({
  declarations: [
    MainViewComponent,
    ProfileComponent,
    HomeComponent,
    HomeCardComponent,
    MainTabsComponent,
    RestaurantMealsComponent,
    OrdersTabComponent,
    DialogSearchComponent,
    RestaurantGridComponent],
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
    DialogSearchComponent
  ]
})
export class OrdersModule { }
