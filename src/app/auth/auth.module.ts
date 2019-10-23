import {NgModule} from '@angular/core';
import {LoginComponent} from './components/login/login.component';
import {SharedModule} from '../shared/shared.module';
import {RouterModule} from '@angular/router';
import {routes} from './auth.routes';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes())
  ],
  exports: [RouterModule]
})
export class AuthModule { }
