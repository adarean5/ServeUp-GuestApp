import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {routerAnimation} from '../../../shared/animations/router.animations';
import {MatDialog} from '@angular/material';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-main-tabs',
  templateUrl: './main-tabs.component.html',
  styleUrls: ['./main-tabs.component.scss'],
  animations: [routerAnimation('300ms', 'ease-in-out', 'ease-in-out')],
})
export class MainTabsComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  private tabLinks = {
    home: '/main/home',
    orders: '/main/orders' ,
    cart: '/main/cart',
    profile: '/main/profile'
  };
  private currentTab: string;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.subscription = new Subscription();

    // Set initial url
    this.currentTab = this.router.url;

    // Detect route change
    this.subscription.add(this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.currentTab = val.url;
        console.log('Current tab', this.currentTab);
      }
    }));
  }

  public getRouteAnimation(outlet: RouterOutlet) {
    return outlet.activatedRouteData.num === undefined
      ? -1
      : outlet.activatedRouteData.num;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
