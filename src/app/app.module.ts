import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './shared/material/material.module';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { OrdersModule } from './orders/orders.module';

import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {appReducers} from './store/reducers/app.reducers';
import {AuthEffects} from './store/effects/auth.effects';

import {environment} from '../environments/environment';
import {StoreRouterConnectingModule} from '@ngrx/router-store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {HomeEffects} from './store/effects/home.effects';
import {CartEffects} from './store/effects/cart.effects';
import { ServiceWorkerModule } from '@angular/service-worker';
export const firebaseConfig = environment.firebaseConfig;

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgbModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AppRoutingModule,
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router'
    }),
    StoreModule.forRoot(appReducers, {
      runtimeChecks: {
        strictActionImmutability: true,
        strictStateImmutability: true
      }
    }),
    EffectsModule.forRoot([
      AuthEffects,
      HomeEffects,
      CartEffects
    ]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    AuthModule,
    OrdersModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
