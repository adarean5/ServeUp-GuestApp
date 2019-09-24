import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';

import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {selectSignedIn} from '../store/selectors/auth.selectors';
import {IAppState} from '../store/states/app.state';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private store: Store<IAppState>,
    private router: Router
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    console.log('Starting can activate');
    return this.checkLogin();
  }

  canLoad(): Observable<boolean> {
    return this.checkLogin();
  }

  checkLogin(): Observable<boolean> {
    return this.store.select(selectSignedIn).pipe(
      map((authStatus: boolean) => {
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
