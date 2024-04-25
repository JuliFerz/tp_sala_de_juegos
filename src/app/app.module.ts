import { BrowserModule } from '@angular/platform-browser';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeModule } from './modules/home/home.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HomeModule,
    SharedModule,
    provideFirebaseApp(() => initializeApp(
      {
        "projectId": "labo-iv-13b4d",
        "appId": "1:430963226621:web:eb22e48eea4b077f678b94",
        "storageBucket": "labo-iv-13b4d.appspot.com",
        "apiKey": "AIzaSyB7yAPqU4_0cd6gem6JRXVpx-GfpIWTLo4",
        "authDomain": "labo-iv-13b4d.firebaseapp.com",
        "messagingSenderId": "430963226621"
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
