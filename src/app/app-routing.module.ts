import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { MainViewComponent } from './orders/views/main-view/main-view.component';
import {AuthGuard} from './auth/auth.guard';
import {HomeComponent} from './orders/views/home/home.component';
import {ProfileComponent} from './orders/views/profile/profile.component';
import {MainTabsComponent} from './orders/views/main-tabs/main-tabs.component';
import {OrdersTabComponent} from './orders/views/orders-tab/orders-tab.component';
import {RestaurantSearchDisplayComponent} from './orders/views/restaurant-search-display/restaurant-search-display.component';
import {MealsComponent} from './orders/views/meals/meals.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'main',
    component: MainViewComponent,
    // canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: MainTabsComponent,
        children: [
          {
            path: 'home',
            component: HomeComponent,
            data: {num: 1}
          },
          {
            path: 'orders',
            component: OrdersTabComponent,
            data: {num: 2}
          },
          {
            path: 'profile',
            component: ProfileComponent,
            data: {num: 3}
          }
        ]
      },
      {
        path: 'search-results',
        component: RestaurantSearchDisplayComponent
      },
      {
        path: 'meals/:id',
        component: MealsComponent
      }
    ]
  },
  /*{
    path: '**',
    redirectTo: '/login'
  }*/
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthGuard
  ]
})
export class AppRoutingModule { }
