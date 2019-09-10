import { NgModule } from '@angular/core';
import { MaterialModule} from './material/material.module';
import { IconComponent } from './icon/icon.component';


@NgModule({
  declarations: [IconComponent],
  exports: [
    IconComponent
  ],
  imports: [
    MaterialModule
  ]
})
export class SharedModule { }
