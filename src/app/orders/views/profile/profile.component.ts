import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Store} from '@ngrx/store';
import {IAppState} from '../../../store/states/app.state';
import {selectUser} from '../../../store/selectors/auth.selectors';
import {User} from '../../../store/models/user.model';
import {gSignOut} from '../../../store/actions/auth.actions';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user$: Observable<User>;

  @Output() emSignOut = new EventEmitter();

  constructor(
    private store: Store<IAppState>
  ) { }

  ngOnInit() {
    this.user$ = this.store.select(selectUser);
  }

  signOut() {
    this.store.dispatch(gSignOut());
  }
}
