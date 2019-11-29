import {Component, OnDestroy, OnInit} from '@angular/core';
import {IAppState} from '../../../store/states/app.state';
import {Store} from '@ngrx/store';
import {User} from '../../../store/models/user.model';
import {selectUser} from '../../../store/selectors/auth.selectors';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {MatDialog} from '@angular/material';
import {DialogSearchComponent} from '../../components/dialog-search/dialog-search.component';
import {selectSearchDialogOpened} from '../../../store/selectors/home.selector';
import {routerAnimation} from '../../../shared/animations/router.animations';
import {openSearchDialog} from '../../../store/actions/home.actions';
import {Subscription} from 'rxjs';
import {Actions, ofType} from '@ngrx/effects';
import {promptRestaurantChange} from '../../../store/actions/cart.actions';
import {tap} from 'rxjs/operators';
import {DialogSwitchRestaurantComponent} from '../../components/dialog-switch-restaurant/dialog-switch-restaurant.component';
import {DialogPaymentComponent} from '../../components/dialog-payment/dialog-payment.component';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss'],
  animations: [routerAnimation('500ms', 'ease-in-out', 'ease-in-out')],
})
export class MainViewComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  tabLinks = {
    home: '/main/home',
    orders: '/main/orders' ,
    profile: '/main/profile',
    cart: '/main/cart'
  };
  currentTab: string;
  user: User;
  searchOpened = false;

  constructor(
    private store: Store<IAppState>,
    private router: Router,
    private searchDialog: MatDialog,
    private restaurantChangeDialog: MatDialog,
    private updates$: Actions
  ) {}

  ngOnInit() {
    console.log('Starting main view');
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
      console.log('main new user', newUser);
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
          panelClass: ['sup-dialog', 'search'],
          maxWidth: '100vw',
          maxHeight: '100vh',
          autoFocus: false
        });
      }
    }));

    // Prompt user to change restaurant dialog
    this.subscription.add(this.updates$.pipe(
      ofType(promptRestaurantChange),
      tap(({meal, currentRestaurant, newRestaurant, type}) => {
        const dialogRef = this.restaurantChangeDialog.open(DialogSwitchRestaurantComponent, {
          data: {
            meal,
            currentRestaurant,
            newRestaurant,
          }
        });
        dialogRef.afterClosed().subscribe((result: any) => {
          console.log(result);
        });
      })
    ).subscribe());
  }

  openSearchDialog() {
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
