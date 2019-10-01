import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainViewComponent } from './views/main-view/main-view.component';
import { MaterialModule } from '../shared/material/material.module';
import { ProfileComponent } from './views/profile/profile.component';
import {StoreModule} from '@ngrx/store';
import {authReducers} from '../store/reducers/auth.reducers';
import {EffectsModule} from '@ngrx/effects';
import {AuthEffects} from '../store/effects/auth.effects';
import {SharedModule} from '../shared/shared.module';
import { HomeComponent } from './views/home/home.component';

@NgModule({
  declarations: [MainViewComponent, ProfileComponent, HomeComponent],
  imports: [
    CommonModule,
    MaterialModule,
    StoreModule.forFeature('auth', authReducers),
    EffectsModule.forFeature([AuthEffects]),
    SharedModule
  ]
})
export class OrdersModule { }
