import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { IndexService } from './services/index.service';
import { HttpClient } from './services/http.client';
import { GooglemapComponent } from './googlemap/googlemap.component';
import { CheckInComponent } from './check-in/check-in.component';
import { UserlistComponent } from './userlist/userlist.component';
import { DatePipe } from './date.pipe';

@NgModule({
  declarations: [
    AppComponent,
    GooglemapComponent,
    CheckInComponent,
    UserlistComponent,
    DatePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [IndexService, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
