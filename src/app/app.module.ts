import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {getFirestore, provideFirestore} from "@angular/fire/firestore";
import {RouterOutlet} from "@angular/router";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";

@NgModule({
  declarations: [],
  imports: [
    AngularFireAuthModule,
    provideFirestore(() => getFirestore()),
    MatSlideToggleModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterOutlet,
  ],
  providers: [],
  bootstrap: []
})
export class AppModule {
}

