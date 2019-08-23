import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { MaterialModule } from '../shared/material/material.module';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class AuthModule { }