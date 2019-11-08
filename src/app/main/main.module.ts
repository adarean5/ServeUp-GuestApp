import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {BarRatingModule} from 'ngx-bar-rating';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {EffectsModule} from '@ngrx/effects';
import {HomeEffects} from '../store/effects/home.effects';
import {CartEffects} from '../store/effects/cart.effects';
import {StoreModule} from '@ngrx/store';
import {cartReducers} from '../store/reducers/cart.reducers';
import {homeReducers} from '../store/reducers/home.reducers';

import {routes} from './main.routes';

import {MainViewComponent} from './views/main-view/main-view.component';
import {ProfileComponent} from './views/profile/profile.component';
import {HomeComponent} from './views/home/home.component';
import {HomeCardComponent} from './components/home-card/home-card.component';
import {MainTabsComponent} from './views/main-tabs/main-tabs.component';
import {OrdersTabComponent} from './views/orders-tab/orders-tab.component';
import {DialogSearchComponent} from './components/dialog-search/dialog-search.component';
import {RestaurantGridComponent} from './components/restaurant-grid/restaurant-grid.component';
import {RestaurantSearchDisplayComponent} from './views/restaurant-search-display/restaurant-search-display.component';
import {ListLayoutComponent} from './components/list-layout/list-layout.component';
import {IconButtonComponent} from './components/icon-button/icon-button.component';
import {MealsComponent} from './views/meals/meals.component';
import {MealCardComponent} from './components/meal-card/meal-card.component';
import {DialogAddCartComponent} from './components/dialog-add-cart/dialog-add-cart.component';
import {CartComponent} from './views/cart/cart.component';
import {CounterComponent} from './components/counter/counter.component';
import {DialogPaymentComponent} from './components/dialog-payment/dialog-payment.component';
import {OrdersEffects} from '../store/effects/orders.effects';
import {ordersReducers} from '../store/reducers/orders.reducers';

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
    SharedModule,
    BarRatingModule,
    RouterModule.forChild(routes()),
    StoreModule.forFeature('cart', cartReducers),
    StoreModule.forFeature('home', homeReducers),
    StoreModule.forFeature('orders', ordersReducers),
    EffectsModule.forFeature([
      HomeEffects,
      CartEffects,
      OrdersEffects
    ]),
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
export class MainModule { }
