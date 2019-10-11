import { Component, OnInit } from '@angular/core';
import {IAppState} from '../../../store/states/app.state';
import {Store} from '@ngrx/store';
import {gSignOut} from '../../../store/actions/auth.actions';
import {User} from '../../../store/models/user.model';
import {selectUser} from '../../../store/selectors/auth.selectors';
import {Router, RouterOutlet} from '@angular/router';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {DialogSearchComponent} from '../../components/dialog-search/dialog-search.component';
import {selectSearchDialogOpened} from '../../../store/selectors/home.selector';
import {routerAnimation} from '../../../shared/animations/router.animations';

enum TabNames {
  Home,
  Restaurant,
  Orders,
  Profile
}

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss'],
  animations: [routerAnimation('300ms', 'ease-in-out', 'ease-in-out')],
})
export class MainViewComponent implements OnInit {
  private tabLinks = {
    home: 'home',
    orders: 'orders' ,
    profile: 'profile'
  };
  private activeLink = this.tabLinks[0];
  private user: User;
  private tabNames = TabNames;
  private currentTab: number;

  constructor(
    private store: Store<IAppState>,
    private router: Router,
    private searchDialog: MatDialog
  ) {}

  ngOnInit() {
    this.currentTab = this.tabNames.Home;
    // Select current user from store
    this.store.select(selectUser).subscribe((newUser: User) => {
      if (newUser === null) {
        this.router.navigate(['/login']);
      } else {
        this.user = newUser;
      }
    });
    // Open search dialog
    this.store.select(selectSearchDialogOpened).subscribe((opened: boolean) => {
      console.log(opened);
      if (opened) {
        this.openSearchDialog();
      }
    });
  }

  private gSignOut() {
    console.log('Sign out from main component.');
    this.store.dispatch(gSignOut());
  }

  private changeTab(tabName) {
    this.currentTab = tabName;
  }

  private openSearchDialog() {
    const dialogConfig = new MatDialogConfig();
    this.searchDialog.open(DialogSearchComponent, dialogConfig);
  }

  public getRouteAnimation(outlet: RouterOutlet) {
    return outlet.activatedRouteData.num === undefined
      ? -1
      : outlet.activatedRouteData.num;
  }
}
