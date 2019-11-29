import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from './store/models/user.model';
import {IAppState} from './store/states/app.state';
import {Store} from '@ngrx/store';
import {selectSignedIn, selectUser} from './store/selectors/auth.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ServeUp';
  user$: Observable<User>;
  signedIn$: Observable<boolean>;

  constructor(private store: Store<IAppState>) {}

  async ngOnInit() {
    this.user$ = this.store.select(selectUser);
    this.signedIn$ = this.store.select(selectSignedIn);
  }
}
