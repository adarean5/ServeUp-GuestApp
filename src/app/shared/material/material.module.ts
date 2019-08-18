import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatTooltipModule,
  MatTableModule,
  MatFormFieldModule,
  MatSortModule
} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    MatButtonModule,
    MatTooltipModule,
    MatTableModule,
    MatFormFieldModule,
    MatSortModule
  ],
  exports: [
    MatButtonModule,
    MatTooltipModule,
    MatTableModule,
    MatFormFieldModule,
    MatSortModule
  ]
})
export class MaterialModule { }
