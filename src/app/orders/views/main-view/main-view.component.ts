import { Component, OnInit } from '@angular/core';
import {IAppState} from '../../../store/states/app.state';
import {Store} from '@ngrx/store';
import {GSignOut} from '../../../store/actions/auth.actions';
import {User} from '../../../store/models/user.model';
import {selectUser} from '../../../store/selectors/auth.selectors';
import {Router} from '@angular/router';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit {
  private user: User;

  constructor(
    private store: Store<IAppState>,
    private router: Router
  ) {}

  ngOnInit() {
    this.store.select(selectUser).subscribe((newUser: User) => {
      if (!newUser) {
        this.router.navigate(['/login']);
      } else {
        this.user = newUser;
      }
    });
  }

  private gSignOut() {
    console.log('Sign out from main component.');
    this.store.dispatch(new GSignOut());
  }
}
