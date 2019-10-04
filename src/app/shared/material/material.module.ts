import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatTooltipModule,
  MatToolbarModule,
  MatTabsModule,
  MatMenuModule,
  MatCardModule,
  MatRippleModule
} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    MatButtonModule,
    MatTooltipModule,
    MatToolbarModule,
    MatTabsModule,
    MatMenuModule,
    MatCardModule,
    MatRippleModule
  ],
  exports: [
    MatButtonModule,
    MatTooltipModule,
    MatToolbarModule,
    MatTabsModule,
    MatMenuModule,
    MatCardModule,
    MatRippleModule
  ]
})
export class MaterialModule { }
