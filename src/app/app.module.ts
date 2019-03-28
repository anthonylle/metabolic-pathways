import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './public/homepage/homepage.component';
import { LandingpageComponent } from './public/landingpage/landingpage.component';
import { AdminbaseComponent } from './public/adminbase/adminbase.component';
import { KgmlDataTableComponent } from './admin/kgml-data-table/kgml-data-table.component';
import { MatTableModule, MatPaginatorModule, MatSortModule, MatIconModule } from '@angular/material';
import { KgmlFilesListComponent } from './admin/kgml-files-list/kgml-files-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    LandingpageComponent,
    AdminbaseComponent,
    KgmlDataTableComponent,
    KgmlFilesListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
