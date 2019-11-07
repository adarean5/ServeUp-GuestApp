import {Routes} from '@angular/router';
import {MainViewComponent} from './views/main-view/main-view.component';
import {MainTabsComponent} from './views/main-tabs/main-tabs.component';
import {HomeComponent} from './views/home/home.component';
import {CartComponent} from './views/cart/cart.component';
import {OrdersTabComponent} from './views/orders-tab/orders-tab.component';
import {ProfileComponent} from './views/profile/profile.component';
import {RestaurantSearchDisplayComponent} from './views/restaurant-search-display/restaurant-search-display.component';
import {MealsComponent} from './views/meals/meals.component';

const ROUTES: Routes = [
  {
    path: '',
    component: MainViewComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/main/home'
      },
      {
        path: '',
        component: MainTabsComponent,
        data: {num: 1},
        children: [
          {
            path: 'home',
            component: HomeComponent,
            data: {num: 1}
          },
          {
            path: 'cart',
            component: CartComponent,
            data: {num: 2}
          },
          {
            path: 'orders',
            component: OrdersTabComponent,
            data: {num: 3}
          },
          {
            path: 'profile',
            component: ProfileComponent,
            data: {num: 4}
          },
        ]
      },
      {
        path: 'search-results',
        component: RestaurantSearchDisplayComponent,
        data: {num: 2},
      },
      {
        path: 'meals/:id',
        component: MealsComponent,
        data: {num: 3},
      },
    ]
  }
];

export function routes() {
  return ROUTES;
}
