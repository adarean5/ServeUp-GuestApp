import {ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {IAppState} from '../../store/states/app.state';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {selectSignedIn} from '../../store/selectors/auth.selectors';
import {filter, map, take, tap} from 'rxjs/operators';
import {getUser} from '../../store/actions/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class MainGuard implements CanActivate {
  constructor(
    private store: Store<IAppState>,
    private router: Router
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
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
        if (authStatus === false) {
          return true;
        } else {
          this.router.navigate(['/main/home']);
          return false;
        }
      })
    );
  }
}
