import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatTooltipModule,
  MatToolbarModule,
  MatTabsModule,
  MatMenuModule
} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    MatButtonModule,
    MatTooltipModule,
    MatToolbarModule,
    MatTabsModule,
    MatMenuModule
  ],
  exports: [
    MatButtonModule,
    MatTooltipModule,
    MatToolbarModule,
    MatTabsModule,
    MatMenuModule
  ]
})
export class MaterialModule { }
