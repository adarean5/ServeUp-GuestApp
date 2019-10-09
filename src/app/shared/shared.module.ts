import { NgModule } from '@angular/core';
import { MaterialModule} from './material/material.module';
import { IconComponent } from './icon/icon.component';
import { HttpClientModule } from '@angular/common/http';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [IconComponent],
  exports: [
    IconComponent,
    MaterialModule,
    HttpClientModule,
  ],
  imports: [
    MaterialModule,
    HttpClientModule,
    CommonModule
  ]
})
export class SharedModule { }
