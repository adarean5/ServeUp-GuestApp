import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainViewComponent } from './views/main-view/main-view.component';
import { ProfileComponent } from './views/profile/profile.component';
import {SharedModule} from '../shared/shared.module';
import { HomeComponent } from './views/home/home.component';
import { HomeCardComponent } from './components/home-card/home-card.component';
import { BarRatingModule } from 'ngx-bar-rating';
import {RouterModule, Routes} from '@angular/router';
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
import { CartComponent } from './views/cart/cart.component';
import { CounterComponent } from './components/counter/counter.component';
import { DialogPaymentComponent } from './components/dialog-payment/dialog-payment.component';
import {FormsModule} from '@angular/forms';
import {routes} from './orders.routes';

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
    CartComponent,
    CounterComponent,
    DialogPaymentComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    BarRatingModule,
    RouterModule.forChild(routes()),
    FormsModule
  ],
  exports: [
    RouterModule
  ],
  entryComponents: [
    DialogSearchComponent,
    DialogAddCartComponent,
    DialogPaymentComponent
  ]
})
export class OrdersModule { }
