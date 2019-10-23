import {Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';

const ROUTES: Routes = [
  {
    path: '',
    component: LoginComponent
  }
];

export function routes() {
  return ROUTES;
}
