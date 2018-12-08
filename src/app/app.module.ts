import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule, MatNativeDateModule, MatFormFieldModule } from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ApiService } from './api.service';
import { ArtistSearchComponent } from './artist-search/artist-search.component';

@NgModule({
  declarations: [
    AppComponent,
    ArtistSearchComponent
  ],
  imports: [
    Ng4LoadingSpinnerModule.forRoot(),
    NgbModule.forRoot(),
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    AppRoutingModule,
    MatButtonModule,
    HttpClientModule,
    MatNativeDateModule,
    MatFormFieldModule
  ],
  providers: [
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
