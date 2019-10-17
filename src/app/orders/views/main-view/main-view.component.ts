import {Component, OnDestroy, OnInit} from '@angular/core';
import {IAppState} from '../../../store/states/app.state';
import {Store} from '@ngrx/store';
import {gSignOut} from '../../../store/actions/auth.actions';
import {User} from '../../../store/models/user.model';
import {selectUser} from '../../../store/selectors/auth.selectors';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {DialogSearchComponent} from '../../components/dialog-search/dialog-search.component';
import {selectSearchDialogOpened} from '../../../store/selectors/home.selector';
import {routerAnimation} from '../../../shared/animations/router.animations';
import {openSearchDialog} from '../../../store/actions/home.actions';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss'],
  animations: [routerAnimation('500ms', 'ease-in-out', 'ease-in-out')],
})
export class MainViewComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  private tabLinks = {
    home: '/main/home',
    orders: '/main/orders' ,
    profile: '/main/profile',
    cart: '/main/cart'
  };
  private currentTab: string;
  private user: User;
  private searchOpened = false;

  constructor(
    private store: Store<IAppState>,
    private router: Router,
    private searchDialog: MatDialog
  ) {}

  ngOnInit() {
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

    // Select current user from store
    this.subscription.add(this.store.select(selectUser).subscribe((newUser: User) => {
      if (newUser === null) {
        this.router.navigate(['/login']);
      } else {
        this.user = newUser;
      }
    }));

    // Search dialog handling based on store state

    this.subscription.add(this.store.select(selectSearchDialogOpened).subscribe((opened: boolean) => {
      this.searchOpened = opened;
      console.log(opened);
      if (this.searchOpened) {
        this.searchDialog.open(DialogSearchComponent, {
          panelClass: 'sup-search-dialog',
          maxWidth: '100vw',
          maxHeight: '100vh',
          autoFocus: false
        });
      }
    }));
  }

  private gSignOut() {
    console.log('Sign out from main component.');
    this.store.dispatch(gSignOut());
  }

  private changeTab(tabName) {
    // this.currentTab = tabName;
  }

  private openSearchDialog() {
    this.store.dispatch(openSearchDialog());
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
