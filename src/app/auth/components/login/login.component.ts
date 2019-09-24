import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {gSignIn} from '../../../store/actions/auth.actions';
import {Store} from '@ngrx/store';
import {IAppState} from '../../../store/states/app.state';
import {User} from '../../../store/models/user.model';
import {selectUser} from '../../../store/selectors/auth.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  constructor(
    private store: Store<IAppState>,
    public router: Router,
  ) { }

  ngOnInit() {
    this.store.select(selectUser).subscribe((user: User) => {
      if (user) {
        this.router.navigate(['/main']);
      }
    });
  }

  private gSignIn() {
    this.store.dispatch(gSignIn());
  }
}
