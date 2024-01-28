import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {RouterOutlet} from "@angular/router";

@NgModule({
  declarations: [],
  imports: [
    MatSlideToggleModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterOutlet
  ],
  providers: [],
  bootstrap: []
})
export class AppModule {
}

