import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './shared/material/material.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { OrdersModule } from './orders/orders.module';

const firebaseConfig = {
  apiKey: 'AIzaSyBPOgjmbV8Fexc_mSzyoNvC7PHZeNsJ5G4',
  authDomain: 'serveup-android-ba698.firebaseapp.com',
  databaseURL: 'https://serveup-android-ba698.firebaseio.com',
  projectId: 'serveup-android-ba698',
  storageBucket: 'serveup-android-ba698.appspot.com',
  messagingSenderId: '702266610802',
  appId: '1:702266610802:web:2e7d5ce412bc6569'
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AppRoutingModule,
    AuthModule,
    OrdersModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
