import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {IAppState} from '../store/states/app.state';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {selectSignedIn} from '../store/selectors/auth.selectors';
import {map} from 'rxjs/operators';

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

  checkLogin(): Observable<boolean> {
    return this.store.select(selectSignedIn).pipe(
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
