import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainViewComponent } from './views/main-view/main-view.component';
import { MaterialModule } from '../shared/material/material.module';


@NgModule({
  declarations: [MainViewComponent],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class OrdersModule { }
