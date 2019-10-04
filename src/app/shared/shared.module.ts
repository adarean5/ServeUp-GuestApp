import { NgModule } from '@angular/core';
import { MaterialModule} from './material/material.module';
import { IconComponent } from './icon/icon.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [IconComponent],
  exports: [
    IconComponent,
    MaterialModule,
    HttpClientModule,
  ],
  imports: [
    MaterialModule,
    HttpClientModule
  ]
})
export class SharedModule { }
