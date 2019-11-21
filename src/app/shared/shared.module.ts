import {NgModule} from '@angular/core';
import {MaterialModule} from './material/material.module';
import {IconComponent} from './components/icon/icon.component';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {LoadingComponent} from './components/loading/loading.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { ErrorComponent } from './components/error/error.component';

@NgModule({
  declarations: [IconComponent, LoadingComponent, SnackbarComponent, ErrorComponent],
  imports: [
    MaterialModule,
    HttpClientModule,
    CommonModule,
  ],
  exports: [
    IconComponent,
    LoadingComponent,
    MaterialModule,
    HttpClientModule,
    CommonModule,
    ErrorComponent
  ]
})
export class SharedModule { }
