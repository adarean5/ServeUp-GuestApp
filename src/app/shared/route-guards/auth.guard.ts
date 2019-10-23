import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot} from '@angular/router';

import {Observable} from 'rxjs';
import {filter, map, take, tap} from 'rxjs/operators';
import {select, Store} from '@ngrx/store';
import {selectSignedIn} from '../../store/selectors/auth.selectors';
import {IAppState} from '../../store/states/app.state';
import {getUser} from '../../store/actions/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private store: Store<IAppState>,
    private router: Router
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    console.log('Starting can activate');
    return this.checkLogin();
  }

  canLoad(route: Route): Observable<boolean> {
    return this.checkLogin();
  }

  checkLogin(): Observable<boolean> {
    return this.store.pipe(
      select(selectSignedIn),
      tap((authStatus: boolean) => {
        if (authStatus === undefined) {
          this.store.dispatch(getUser());
        }
      }),
      filter((authStatus: boolean) => authStatus !== undefined),
      take(1),
      map((authStatus: boolean) => {
        console.log('AUTH GUARD Auth status', authStatus);
        if (authStatus !== false) {
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }
}
