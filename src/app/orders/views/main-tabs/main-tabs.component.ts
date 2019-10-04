import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {routerAnimation} from '../../../shared/animations/router.animations';

@Component({
  selector: 'app-main-tabs',
  templateUrl: './main-tabs.component.html',
  styleUrls: ['./main-tabs.component.scss'],
  animations: [routerAnimation('300ms', 'ease-in', 'ease-out')],
})
export class MainTabsComponent implements OnInit {
  private tabLinks = {
    home: 'home',
    orders: 'orders' ,
    profile: 'profile'
  };
  private activeTab = this.tabLinks.home;

  constructor() { }

  ngOnInit() {
  }

  public getRouteAnimation(outlet: RouterOutlet) {
    return outlet.activatedRouteData.num === undefined
      ? -1
      : outlet.activatedRouteData.num;
  }

}
