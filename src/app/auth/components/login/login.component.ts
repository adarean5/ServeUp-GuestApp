import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {gSignIn} from '../../../store/actions/auth.actions';
import {Store} from '@ngrx/store';
import {IAppState} from '../../../store/states/app.state';
import {User} from '../../../store/models/user.model';
import {selectLoading, selectUser} from '../../../store/selectors/auth.selectors';
import {takeWhile} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loading: boolean;

  constructor(
    private store: Store<IAppState>,
    public router: Router,
  ) { }

  ngOnInit() {
    console.log('Login component init');
    this.store.select(selectUser).pipe(takeWhile(user => !user, true)).subscribe((user: User) => {
      if (user) {
        this.router.navigate(['/main']);
      }
    });

    this.store.select(selectLoading).subscribe((loading: boolean) => {
      console.log('Loading status: ', loading);
      this.loading = loading;
    });
  }

  gSignIn() {
    console.log('G sign in button clicked');
    this.store.dispatch(gSignIn());
  }
}
