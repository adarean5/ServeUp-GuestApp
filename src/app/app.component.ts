import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from './store/models/user.model';
import {IAppState} from './store/states/app.state';
import {Store} from '@ngrx/store';
import {getUser} from './store/actions/auth.actions';
import {selectUser} from './store/selectors/auth.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ServeUp';
  user$: Observable<User>;

  constructor(private store: Store<IAppState>) {}

  async ngOnInit() {
    navigator.geolocation.getCurrentPosition(position => {
      console.log('Position',  position);
    });
    console.log('Starting app component init');
    this.user$ = this.store.select(selectUser);
    console.log('Starting dispatchUser');
    console.log('Ending dispatch user.');
    console.log('Ending app component init');
  }

  async dispatchUser() {
    // const dispatchResult = await this.store.dispatch(getUser());
    // console.log('Dispatch result:', dispatchResult);
  }
}
