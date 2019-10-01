import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {gSignIn} from '../../../store/actions/auth.actions';
import {Store} from '@ngrx/store';
import {IAppState} from '../../../store/states/app.state';
import {User} from '../../../store/models/user.model';
import {selectLoading, selectUser} from '../../../store/selectors/auth.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  private loading: boolean;

  constructor(
    private store: Store<IAppState>,
    public router: Router,
  ) { }

  ngOnInit() {
    console.log('Login component init');
    this.store.select(selectUser).subscribe((user: User) => {
      if (user) {
        this.router.navigate(['/main']);
      }
    });

    this.store.select(selectLoading).subscribe((loading: boolean) => {
      console.log('Loading status: ', loading);
      this.loading = loading;
    });
  }

  private gSignIn() {
    console.log('G sign in button clicked');
    this.store.dispatch(gSignIn());
  }
}
