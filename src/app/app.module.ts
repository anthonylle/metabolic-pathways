import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './public/homepage/homepage.component';
import { LandingpageComponent } from './public/landingpage/landingpage.component';
import { AdminbaseComponent } from './public/adminbase/adminbase.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    LandingpageComponent,
    AdminbaseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
